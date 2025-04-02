import { NextResponse } from 'next/server'
import getStripe from '@/lib/stripe'
import { Product } from '@/lib/stores/cart-store'
import getServerApp from '@/lib/firebase/getServerApp'
import { getAuth } from 'firebase/auth'

// TODO: Use real user credentials!!!
export async function POST(request: Request) {
  try {
    const { amount, products, shippingInfo } = await request.json()
    
    // N.B. this could be done faster by just 
    console.log("About to get server app");
    const app = await getServerApp();
    console.log("About to get auth");
    const auth = getAuth(app);
    await auth.authStateReady();

    const customer = auth.currentUser;
    if (!customer) {
      return NextResponse.json({ error: 'No customer found' }, { status: 401 });
    }

    const { claims } = await customer.getIdTokenResult();

    // Create product items for metadata
    const productItems = products.map((product: Product) => ({
      productId: product.productId,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      variant: product.selectedOption.map((opt) => `${opt.name}: ${opt.value}`).join(', ')
    }))

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        order_items: JSON.stringify(productItems),
        customer_email: String(claims.email),
        customer_id: String(claims.sub),
        customer_name: String(claims.name),
        total_items: products.length,
        products: products.map((p: Product) => p.name).join(', '),
        // N.B. This is currently empt because we do not store phone numbers anywhere in the app
        customer_phone: typeof claims.phone === "string" ? claims.phone : 'N/A',
        shipping_info: JSON.stringify(shippingInfo)
      }
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 })
  }
}
