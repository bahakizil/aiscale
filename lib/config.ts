import { z } from 'zod';

/**
 * Environment Configuration Schema
 * Similar to Pydantic Settings in Python, using Zod for validation
 */
const envSchema = z.object({
  // Stripe Configuration
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'Stripe publishable key is required'),
  STRIPE_SECRET_KEY: z.string().min(1, 'Stripe secret key is required').optional(),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'Stripe webhook secret is required').optional(),

  // GoHighLevel Configuration
  NEXT_PUBLIC_GOHIGHLEVEL_FORM_ID: z.string().min(1, 'GoHighLevel form ID is required'),

  // Application Configuration
  NEXT_PUBLIC_APP_URL: z.string().url('Must be a valid URL'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

/**
 * Server-side environment configuration
 * Only use on the server (API routes, server components)
 */
const serverEnvSchema = envSchema.extend({
  STRIPE_SECRET_KEY: z.string().min(1, 'Stripe secret key is required'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'Stripe webhook secret is required'),
});

/**
 * Validate and parse environment variables
 */
function validateEnv() {
  const env = {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_GOHIGHLEVEL_FORM_ID: process.env.NEXT_PUBLIC_GOHIGHLEVEL_FORM_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  try {
    return envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
      throw new Error('Invalid environment variables');
    }
    throw error;
  }
}

/**
 * Validate server-side environment variables
 */
function validateServerEnv() {
  const env = {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_GOHIGHLEVEL_FORM_ID: process.env.NEXT_PUBLIC_GOHIGHLEVEL_FORM_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  try {
    return serverEnvSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid server environment variables:', error.flatten().fieldErrors);
      throw new Error('Invalid server environment variables');
    }
    throw error;
  }
}

/**
 * Public configuration - Safe to use on client-side
 */
export const publicConfig = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  },
  goHighLevel: {
    formId: process.env.NEXT_PUBLIC_GOHIGHLEVEL_FORM_ID || '84Is6fx7guuS4EeNPxf2',
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    env: process.env.NODE_ENV || 'development',
  },
};

/**
 * Server configuration - Only use on server-side
 * This will throw an error if used on client-side
 */
export const serverConfig = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
  goHighLevel: {
    formId: process.env.NEXT_PUBLIC_GOHIGHLEVEL_FORM_ID || '84Is6fx7guuS4EeNPxf2',
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    env: process.env.NODE_ENV || 'development',
  },
};

/**
 * Type-safe environment configuration
 */
export type EnvConfig = z.infer<typeof envSchema>;
export type ServerEnvConfig = z.infer<typeof serverEnvSchema>;

/**
 * Validate environment on module load (only in production)
 */
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}
