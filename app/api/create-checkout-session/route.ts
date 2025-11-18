import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getSettings } from '@/lib/settings'

export async function POST() {
  try {
    // Get settings from file-based storage
    const settings = await getSettings()

    // Check if Stripe is configured (prioritize settings, fallback to env vars)
    const stripeSecretKey = settings.stripeSecretKey || process.env.STRIPE_SECRET_KEY
    const stripePriceId = settings.stripePriceId || process.env.NEXT_PUBLIC_STRIPE_PRICE_ID
    const siteUrl = settings.siteUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    if (!stripeSecretKey || !stripePriceId) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add Stripe credentials in Admin Settings.' },
        { status: 503 }
      )
    }

    // Initialize Stripe with settings
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-10-29.clover',
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
