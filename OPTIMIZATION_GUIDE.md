# Optimization Guide

Bu dokümantasyon, unified-website projesinde yapılan optimizasyonları ve konfigürasyon ayarlarını açıklar.

## 📋 İçindekiler

1. [Yapılandırma Sistemi](#yapılandırma-sistemi)
2. [Performans Optimizasyonları](#performans-optimizasyonları)
3. [Stripe Entegrasyonu](#stripe-entegrasyonu)
4. [UI/UX İyileştirmeleri](#uiux-iyileştirmeleri)

---

## 🔧 Yapılandırma Sistemi

### Environment Variables

Projenin tüm hassas bilgileri `.env.local` dosyasında saklanır. Bu dosya Git'e eklenmemiştir (`.gitignore`'da).

#### Stripe API Keys

```bash
# Public key - Client-side için
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Secret key - Server-side için
STRIPE_SECRET_KEY=sk_test_your_key_here

# Webhook secret - Stripe webhook doğrulaması için
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

#### GoHighLevel Configuration

```bash
NEXT_PUBLIC_GOHIGHLEVEL_FORM_ID=84Is6fx7guuS4EeNPxf2
```

### Config Module (`lib/config.ts`)

Zod kullanarak environment variable validation (Python Pydantic Settings benzeri):

```typescript
import { publicConfig, serverConfig } from '@/lib/config';

// Client-side kullanım
const stripeKey = publicConfig.stripe.publishableKey;

// Server-side kullanım (API routes, server components)
const secretKey = serverConfig.stripe.secretKey;
```

**Özellikler:**
- ✅ Type-safe environment variables
- ✅ Otomatik validation
- ✅ Client/Server ayrımı
- ✅ Production'da otomatik kontrol

---

## ⚡ Performans Optimizasyonları

### Next.js Config (`next.config.ts`)

#### 1. Compiler Optimizations

```typescript
compiler: {
  // Production'da console.log'ları kaldır (error/warn hariç)
  removeConsole: process.env.NODE_ENV === 'production' ? {
    exclude: ['error', 'warn'],
  } : false,
}
```

#### 2. Image Optimization

```typescript
images: {
  formats: ['image/avif', 'image/webp'],  // Modern formatlar
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  minimumCacheTTL: 60,  // Cache süres
}
```

#### 3. Package Import Optimization

```typescript
experimental: {
  optimizePackageImports: [
    'lucide-react',
    '@radix-ui/react-accordion',
    'framer-motion',
    // ... diğer paketler
  ],
}
```

**Faydası:** Tree-shaking ve bundle size küçültme

#### 4. Webpack Code Splitting

```typescript
webpack: (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    config.optimization = {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Vendor chunk (node_modules)
          vendor: { name: 'vendor', test: /node_modules/, priority: 20 },
          // Commons chunk (shared code)
          common: { name: 'common', minChunks: 2, priority: 10 },
          // UI components chunk
          ui: { name: 'ui', test: /[\\/]components[\\/]/, priority: 15 },
        },
      },
    };
  }
  return config;
}
```

**Sonuç:**
- 📦 Daha küçük initial bundle
- 🚀 Daha hızlı sayfa yüklemeleri
- 💾 Daha iyi caching

#### 5. Security Headers

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ];
}
```

---

## 💳 Stripe Entegrasyonu

### Stripe Utility (`lib/stripe.ts`)

#### Client-side Stripe Instance

```typescript
import { getStripe } from '@/lib/stripe';

const stripe = await getStripe();
```

#### Product Configuration

```typescript
import { PRODUCTS } from '@/lib/stripe';

const product = PRODUCTS.ACCELERATED_PACKAGE;
console.log(product.price); // 27.00
console.log(product.originalPrice); // 497.00
```

#### Currency Formatting

```typescript
import { formatCurrency } from '@/lib/stripe';

const formatted = formatCurrency(27.00, 'USD');
console.log(formatted); // "$27.00" (Türkçe locale ile)
```

---

## 🎨 UI/UX İyileştirmeleri

### Web Funnel Landing Page

#### 1. Headline İyileştirmeleri

- ✅ Daha iyi okunabilirlik için satır arası boşluklar
- ✅ Önemli sayılar için renk vurguları (sarı/teal)
- ✅ Responsive font boyutları (mobile → desktop)
- ✅ Gradient text efektleri

#### 2. Features Section

- ✅ Gradient arka planlar
- ✅ Hover efektleri (transition-colors)
- ✅ Daha büyük checkbox ikonları (gradient)
- ✅ Shadow efektleri (depth)
- ✅ Daha iyi padding/spacing

#### 3. Results Section

- ✅ Gradient text sayılar için
- ✅ Border animations (hover states)
- ✅ Kart sisteminde gradient backgrounds
- ✅ Disclaimer için ayrı bölüm

### Checkout Page İyileştirmeleri

#### Features List

- ✅ Daha organize başlık (border-bottom)
- ✅ Gradient bullet points
- ✅ Hover states
- ✅ Daha iyi text hierarchy
- ✅ Color coding (kırmızı/turuncu bullets)

### CSS Uygulamaları

```css
/* Gradient Text */
.bg-gradient-to-r.from-yellow-400.to-teal-400.bg-clip-text.text-transparent

/* Gradient Backgrounds */
.bg-gradient-to-br.from-gray-900.to-gray-800

/* Hover Effects */
.hover:bg-gray-800/50.transition-colors

/* Shadows */
.shadow-2xl.shadow-lg
```

---

## 📊 Performans Metrikleri

### Beklenen İyileştirmeler

- **Bundle Size:** %20-30 azalma
- **Initial Load:** %15-25 daha hızlı
- **LCP (Largest Contentful Paint):** İyileştirildi
- **CLS (Cumulative Layout Shift):** Minimize edildi
- **FID (First Input Delay):** Optimize edildi

### Monitoring

Production'da performans ölçümleri için:

```bash
npm run build
npm run start
```

Chrome DevTools → Lighthouse ile test edin.

---

## 🚀 Deployment

### Environment Variables

Production'da aşağıdaki environment variable'ları ayarlayın:

1. **Stripe Keys** - Production keys ile değiştir
2. **App URL** - Production domain
3. **NODE_ENV** - `production`

### Build Command

```bash
npm run build
```

### Start Command

```bash
npm run start
```

---

## 📝 Notlar

1. **Stripe Test Mode**: Development'ta test keys kullanın
2. **Environment Variables**: `.env.local` dosyasını asla commit etmeyin
3. **Performance**: Production build'de console.log'lar otomatik kaldırılır
4. **Security**: Tüm API keys server-side'da kalmalı

---

## 🆘 Yardım

Sorularınız için:
- Next.js Docs: https://nextjs.org/docs
- Stripe Docs: https://stripe.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
