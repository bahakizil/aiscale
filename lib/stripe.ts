import { loadStripe, Stripe } from '@stripe/stripe-js';
import { publicConfig } from './config';

/**
 * Stripe client-side instance (singleton)
 */
let stripePromise: Promise<Stripe | null>;

/**
 * Get Stripe.js instance
 * Use this on the client-side only
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(publicConfig.stripe.publishableKey);
  }
  return stripePromise;
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Payment product configuration
 */
export const PRODUCTS = {
  ACCELERATED_PACKAGE: {
    name: 'AI Arbitrage Hızlandırılmış Paket',
    price: 27.00,
    originalPrice: 497.00,
    currency: 'USD',
    description: 'Tek seferlik ödeme - Anında erişim',
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
