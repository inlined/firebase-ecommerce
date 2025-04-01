import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import getStripe from '@/lib/stripe'
import Stripe from 'stripe'
import { createOrder, createOrderItem, updateOrderByPaymentIntentId } from './graphql'

export const config = {
  api: {
    bodyParser: false // Disable body parsing, need raw body for signature verification
  }
}

console.error("COMPILING STRIPE WEBHOOK");

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not set')
  }

  const body = await request.text()
  const headersStore = await headers()
  const signature = headersStore.get('stripe-signature') ?? ''

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret)
  } catch (err) {
    const error = err as Error
    console.error(`Webhook signature verification failed: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  try {
    switch (event.type) {
    // Occurs when a PaymentIntent has successfully completed payment.
    // The payment has been captured and the funds are available.
    // This event contains detailed metadata about the transaction.
    // Use this webhook to:
    // - Update order status in your database
    // - Trigger fulfillment processes
    // - Update inventory systems
    // - Record customer purchase history
    case 'payment_intent.succeeded':
      await processPaymentIntentSucceeded(event);
      break

    // Occurs when a PaymentIntent fails the payment process.
    // This can happen due to insufficient funds, card declined,
    // authentication failures, or other payment method issues.
    // Use this webhook to:
    // - Update order status
    // - Notify customers of failed payments
    // - Trigger retry logic if applicable
    // - Log failed payment attempts
    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      await updateOrderByPaymentIntentId({
        paymentIntentId: paymentIntent.id,
        financialStatus: 'failed',
        fulfillmentStatus: 'cancelled',
        processedAt: new Date().toISOString().slice(0, 19),
      });
      break;

    // Occurs when a charge is successfully created and funds captured.
    // This represents the actual transfer of funds from the customer.
    // Contains detailed information about the payment, including
    // receipt details and customer information.
    // Use this webhook to:
    // - Send payment receipts
    // - Update accounting systems
    // - Record successful payment details
    // - Update customer payment history
    case 'charge.succeeded':
      const success = event.data.object;
      if (!success.payment_intent) {
        console.debug("Skipping charge succeeded event because there was no payment intent");
        break;
      }

      await updateOrderByPaymentIntentId({
        paymentIntentId: success.payment_intent.toString(),
        chargeId: success.id,
        financialStatus: 'paid',
        fulfillmentStatus: 'processing',
        receiptUrl: success.receipt_url ?? undefined,
        processedAt: new Date().toISOString().slice(0, 19),
      })
      break;

    // Occurs when a charge's properties have been updated.
    // This can happen when:
    case 'charge.updated':
      const charge = event.data.object as Stripe.Charge

      // processedAt: new Date().toISOString().slice(0, 19),
      await updateOrderByPaymentIntentId({
        paymentIntentId: charge.payment_intent?.toString() ?? '',
        chargeId: charge.id,
        financialStatus: charge.status,
        receiptUrl: charge.receipt_url ?? undefined,
        processedAt: new Date().toISOString().slice(0, 19),
      });
      break;

    default:
      console.debug(`Skipping unexpected event type ${event.type}`);
      break;
    }

  } catch (error) {
    console.error(`Error processing Stripe ${event.type} event:`, error)
  }

  return NextResponse.json({ received: true })
}

async function processPaymentIntentSucceeded({data: { object: paymentIntent }}: Stripe.PaymentIntentSucceededEvent): Promise<void> {
  const metadata = paymentIntent.metadata;
  const orderItems = JSON.parse(metadata.order_items || '[]') as {
    productId: string
    quantity: number
    price: number
  }[]

  const { order_insert: order } = await createOrder({
    customerId: metadata.customer_id,
    paymentIntentId: paymentIntent.id,
    subtotalPrice: paymentIntent.amount,
    totalTax: 0,
    totalShippingPrice: 0,
    totalPrice: paymentIntent.amount,
    financialStatus: 'pending',
    fulfillmentStatus: 'pending'
  })

  const items = orderItems.map(
    (item: { productId: string; quantity: number; price: number }) => {
      return {
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }
    }
  )

  await Promise.all(items.map((item) => createOrderItem(item)))
}
