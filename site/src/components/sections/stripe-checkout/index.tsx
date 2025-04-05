'use client'

import { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useAuth } from '@/hooks/useAuth'
import CheckoutForm from './checkout-form'
import { Product } from '@/lib/stores/cart-store'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!)

type Props = {
  amount: number
  products: Product[]
  shippingInfo?: {
    name: string
    email: string
    address1: string
    address2: string
    city: string
    state: string
    zipCode: string
  }
}

export default function StripeCheckout({ amount, products, shippingInfo }: Props) {
  const [clientSecret, setClientSecret] = useState('')
  const { user: customer } = useAuth()

  useEffect(() => {
    // Wait 500ms after all fields are valid before running the fetch
    const timer = setTimeout(() => {
      customer?.getIdToken().then((token) => {
        return token;
      }).then((token) => {
        return fetch('/api/stripe/payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`,
          },
          body: JSON.stringify({
            amount,
            products,
            shippingInfo, 
          })
        });
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
    }, 500)

    // Cleanup to cancel timer if user updates the shipping info again
    return () => clearTimeout(timer)
  }, [amount, products, customer, shippingInfo])

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}
