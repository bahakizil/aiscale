# Performance Optimization Guide

Bu dokümanda sistemin performance optimizasyonları ve en iyi uygulamaları açıklanmıştır.

## ✅ Uygulanan Optimizasyonlar

### 1. 🖼️ Image Optimization

**Next.js Image Component:**
- Otomatik format conversion (AVIF, WebP)
- Lazy loading (viewport'a girdiğinde yüklenir)
- Responsive sizes (device'a göre boyutlandırma)
- Blur placeholder (yüklenirken blur efekti)
- Quality optimization (varsayılan %75)

**Configuration (`next.config.ts`):**
```typescript
images: {
  formats: ['image/avif', 'image/webp'], // Modern formatlar
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60, // 60 saniye minimum cache
}
```

**OptimizedImage Component (`components/OptimizedImage.tsx`):**
- Loading skeleton animation
- Error handling with fallback UI
- Progressive loading
- Automatic lazy loading

**Kullanım:**
```tsx
import OptimizedImage from '@/components/OptimizedImage';

<OptimizedImage
  src="/media/images/hero.jpg"
  alt="Hero Image"
  width={1200}
  height={600}
  priority={false} // İlk ekranda değilse lazy load
  quality={85} // %85 kalite
/>
```

---

### 2. 📦 Bundle Optimization

**Code Splitting:**
```typescript
// next.config.ts
webpack: (config, { dev, isServer }) => {
  if (!dev && !isServer) {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 10,
          },
        },
      },
    };
  }
  return config;
}
```

**Package Import Optimization:**
```typescript
experimental: {
  optimizePackageImports: [
    'lucide-react',
    '@radix-ui/react-accordion',
    'framer-motion',
  ],
  optimizeCss: true, // CSS tree-shaking
}
```

---

### 3. 🗂️ Caching Strategy

**Static Assets (1 yıl cache):**
```typescript
async headers() {
  return [
    {
      source: '/media/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

**Image Cache:**
- Medya klasöründeki görseller 1 yıl browser cache'inde kalır
- Next.js otomatik olarak optimize edilmiş versiyonları cache'ler
- CDN kullanımına hazır

---

### 4. 🚀 Runtime Optimizations

**React Strict Mode:**
```typescript
reactStrictMode: true, // Potansiyel problemleri tespit eder
```

**Console Log Removal (Production):**
```typescript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production' ? {
    exclude: ['error', 'warn'], // Sadece error ve warn kalır
  } : false,
}
```

---

### 5. 📱 PWA & Service Worker

**Offline Caching (`public/service-worker.js`):**
- Network-first stratejisi (önce network, sonra cache)
- Otomatik cache yönetimi
- Offline fallback sayfası
- Background sync support

**Cache Strategy:**
1. İstek yapılır
2. Network'ten cevap alınırsa, hem kullanıcıya gönderilir hem cache'lenir
3. Network başarısız olursa, cache'ten servis edilir
4. Cache'te de yoksa offline sayfası gösterilir

---

### 6. ⚡ Lazy Loading

**Component Lazy Loading:**
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSkeleton />,
  ssr: false, // Sadece client-side yükle
});
```

**Image Lazy Loading:**
- Viewport dışındaki görseller otomatik lazy load
- Priority flag ile kritik görseller hemen yüklenir
- Blur placeholder ile UX iyileştirme

---

### 7. 🔒 Security Headers

**next.config.ts:**
```typescript
headers: [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN', // Clickjacking koruması
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff', // MIME type sniffing koruması
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on', // DNS prefetch aktif
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]
```

---

## 📊 Performance Metrics

### Hedef Değerler:

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s ✅
- FID (First Input Delay): < 100ms ✅
- CLS (Cumulative Layout Shift): < 0.1 ✅

**Lighthouse Scores:**
- Performance: > 90 🎯
- Accessibility: > 90 🎯
- Best Practices: > 90 🎯
- SEO: > 90 🎯

---

## 🔧 Admin Panel Settings

### Image Cache Ayarları

**Settings > Gelişmiş > Görsel Cache Süresi**
- Varsayılan: 31536000 saniye (1 yıl)
- Minimum: 3600 saniye (1 saat)
- Maximum: 31536000 saniye (1 yıl)

### Image Optimization

**Settings > Gelişmiş > Görsel Optimizasyonu**
- ✅ Aktif: AVIF ve WebP formatlarına otomatik dönüşüm
- ❌ Pasif: Sadece orijinal format kullanılır

---

## 📈 Performance Monitoring

### Built-in Monitoring:

**1. Conversion Tracking:**
```tsx
import { ConversionEvents } from '@/lib/conversion-tracking';

// Sayfa yükleme süresi
ConversionEvents.custom('page_load_time', {
  loadTime: performance.now()
});
```

**2. Session Tracking:**
- Otomatik session başlatma
- Aktivite tracking
- Page view sayısı
- Session süresi

### Analytics Integration:

**Google Analytics 4:**
- Automatic page view tracking
- Custom event tracking
- User journey mapping
- Performance metrics

**Facebook Pixel:**
- Page view tracking
- Conversion tracking
- Custom events

---

## 🛠️ Best Practices

### 1. Image Upload

**Önerilen Formatlar:**
- JPEG: Fotoğraflar için (kalite/boyut dengesi)
- PNG: Transparent background için
- WebP: Modern browserlar için (JPEG'ten %30 daha küçük)
- AVIF: En modern format (%50 daha küçük)

**Önerilen Boyutlar:**
- Hero images: Max 1920x1080
- Thumbnails: Max 400x400
- Icons: 192x192, 512x512 (PWA için)

**Optimizasyon:**
```bash
# ImageOptim, TinyPNG veya Squoosh kullanın
# Yüklemeden önce optimize edin
```

### 2. Video İçerik

**YouTube Embedding:**
- Native video upload yerine YouTube kullanın
- Lazy load iframe
- Thumbnail önizleme

### 3. Code Organization

**Component Structure:**
```
- Client Components: 'use client' ile işaretle
- Server Components: Varsayılan (veri fetching için)
- Dynamic Imports: Ağır component'ler için
```

### 4. Data Fetching

**Server-side:**
```tsx
// app/page.tsx
async function getData() {
  const res = await fetch('...', {
    next: { revalidate: 3600 } // 1 saat cache
  });
  return res.json();
}
```

**Client-side:**
```tsx
// SWR kullanımı
import useSWR from 'swr';

const { data } = useSWR('/api/data', fetcher, {
  revalidateOnFocus: false,
  dedupingInterval: 60000, // 1 dakika
});
```

---

## 🔍 Performance Testing

### Lighthouse Audit:

```bash
# Chrome DevTools > Lighthouse
# veya CLI ile:
npm install -g lighthouse
lighthouse https://yourdomain.com --view
```

### WebPageTest:

```
https://www.webpagetest.org/
```

### Google PageSpeed Insights:

```
https://pagespeed.web.dev/
```

---

## 📝 Checklist

Deployment öncesi kontrol listesi:

### Images:
- [ ] Tüm görseller optimize edildi
- [ ] Critical görseller `priority={true}` ile işaretlendi
- [ ] Alt texts eklendi
- [ ] Responsive sizes tanımlandı

### Code:
- [ ] Unused code kaldırıldı
- [ ] Console.log'lar temizlendi (production'da otomatik)
- [ ] TypeScript hataları yok
- [ ] Build başarılı

### Caching:
- [ ] Cache headers doğru ayarlandı
- [ ] Service worker test edildi
- [ ] Static assets CDN'e yüklendi (opsiyonel)

### Analytics:
- [ ] GA4 ID ayarlandı (Settings > Analytics)
- [ ] Facebook Pixel ID ayarlandı
- [ ] Conversion tracking test edildi

### SEO:
- [ ] Meta descriptions eklendi
- [ ] Open Graph tags ayarlandı
- [ ] Sitemap güncel
- [ ] Robots.txt doğru

### Security:
- [ ] HTTPS aktif (production)
- [ ] Security headers ayarlandı
- [ ] Rate limiting test edildi
- [ ] CSRF protection aktif

---

## 🚀 Deployment Optimizations

### Vercel (Önerilen):

```bash
# Build optimization
next build

# Analyze bundle
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

**Vercel Settings:**
- Enable: Edge Network
- Enable: Image Optimization
- Enable: Incremental Static Regeneration
- Framework Preset: Next.js

### Environment Variables:

**Production'da eklenecekler:**
```bash
NODE_ENV=production
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=XXXXXXXXX
```

---

## 💡 Advanced Tips

### 1. Preload Critical Resources:

```tsx
// app/layout.tsx
<head>
  <link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
</head>
```

### 2. Resource Hints:

```tsx
<link rel="dns-prefetch" href="https://analytics.google.com" />
<link rel="preconnect" href="https://www.facebook.com" />
```

### 3. Critical CSS:

Next.js otomatik olarak critical CSS'i inline eder.

### 4. Font Optimization:

```tsx
// Font'lar zaten optimize (Geist Sans & Mono)
// next/font kullanarak yükleniyor
```

---

## 📞 Support

Performance ile ilgili sorularınız için:
- GitHub Issues
- Admin Panel > Ayarlar > Gelişmiş

**Son Güncelleme:** 2025-01-18
**Versiyon:** 1.0.0
