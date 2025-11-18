# 🚀 Unified Website - AI Acquisition Method

Modern, performanslı ve kod bilgisi gerektirmeyen tam özellikli web sitesi yönetim sistemi.

## 📋 İçindekiler

- [Özellikler](#-özellikler)
- [Hızlı Başlangıç](#-hızlı-başlangıç)
- [Admin Panel Kullanımı](#-admin-panel-kullanımı)
- [Dokümantasyon](#-dokümantasyon)
- [Performance](#-performance)

## ✨ Özellikler

### 🎯 Temel Özellikler
- ✅ **Admin Panel:** Kod bilgisi gerektirmeden tam kontrol
- ✅ **Settings Sayfası:** Tüm ayarlar admin panelden (Analytics, PWA, Sosyal Medya)
- ✅ **Multi-Language:** TR/EN dil desteği
- ✅ **Media Library:** Sürükle-bırak dosya yönetimi
- ✅ **YouTube Embedding:** Video link'leri otomatik embed
- ✅ **SEO Optimized:** Sitemap, meta tags, Open Graph
- ✅ **PWA Support:** Mobil app gibi çalışır

### 📊 Analytics & Tracking
- ✅ **Google Analytics 4:** Admin panelden ID girişi
- ✅ **Facebook Pixel:** Admin panelden ID girişi
- ✅ **Funnel Tracking:** Kullanıcı yolculuğu izleme
- ✅ **Session Tracking:** Detaylı oturum analizi
- ✅ **Drop-off Analysis:** Kayıp noktalarını tespit

### 🔒 Güvenlik
- ✅ **Rate Limiting:** Brute force koruması (5 deneme/15dk)
- ✅ **CSRF Protection:** Token bazlı güvenlik
- ✅ **Security Headers:** XSS, Clickjacking koruması
- ✅ **Admin Authentication:** Güvenli giriş sistemi

### 🚀 Performance
- ✅ **Image Optimization:** AVIF, WebP auto-conversion
- ✅ **Lazy Loading:** Viewport bazlı yükleme
- ✅ **Code Splitting:** Optimal bundle boyutu
- ✅ **Caching:** 1 yıl static asset cache
- ✅ **Service Worker:** Offline support

## 🚀 Hızlı Başlangıç

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev
```

Site `http://localhost:3000` adresinde çalışır.

### İlk Kurulum

1. **Admin panele giriş:**
   ```
   URL: http://localhost:3000/admin/login
   Kullanıcı adı: admin
   Şifre: admin123
   ```

2. **Ayarları yapılandır:**
   ```
   Admin Panel > ⚙️ Ayarlar
   ```

   - **Genel:** Site adı, URL, açıklama, SEO keywords
   - **Analytics:** Google Analytics ID (G-XXXXXXXXXX), Facebook Pixel ID
   - **PWA:** Push notification ayarları, VAPID keys (opsiyonel)
   - **Sosyal Medya:** Facebook, Twitter, LinkedIn, Instagram URL'leri
   - **Gelişmiş:** Image cache süresi, optimization ayarları

3. **İçerik düzenle:**
   ```
   Admin Panel > İçerik Yönetimi
   ```

4. **Medya yükle:**
   ```
   Admin Panel > 📁 Medya
   ```

## 📚 Admin Panel Kullanımı

### ⚙️ Ayarlar Sayfası (YENİ!)

**Tüm environment variables artık admin panelden yönetiliyor:**

#### 🏠 Genel Tab
- Site Adı
- Site URL (SEO için)
- Site Açıklaması
- SEO Anahtar Kelimeler
- Çoklu Dil Aktif/Pasif

#### 📊 Analytics Tab
- ✅ Analytics Sistemini Aktif Et
- Google Analytics ID (GA4)
- Facebook Pixel ID
- GoHighLevel API Key

#### 📱 PWA & Bildirimler Tab
- ✅ Push Notifications Aktif/Pasif
- VAPID Public Key
- VAPID Private Key
- VAPID key oluşturma talimatı

#### 🌐 Sosyal Medya Tab
- Facebook URL
- Twitter/X URL
- LinkedIn URL
- Instagram URL

#### ⚡ Gelişmiş Tab
- ✅ Görsel Optimizasyonu (AVIF, WebP)
- Görsel Cache Süresi (saniye)
- Performance ayarları

**Özellikler:**
- 💾 Tek tıkla kaydet
- 🔄 Varsayılana sıfırla
- 📑 Tab bazlı organize arayüz
- 💡 Her ayar için açıklayıcı bilgi
- ✅ Real-time güncelleme

### 🏠 Dashboard

- Real-time önizleme
- Auto-save (3 saniye)
- Undo/Redo (Ctrl+Z / Ctrl+Y)
- Keyboard shortcuts (Ctrl+S)

### 📁 Medya Kütüphanesi

**Klasörler:**
- Images (JPEG, PNG, GIF, WebP)
- Videos (MP4, WebM)
- Documents (PDF)

**Özellikler:**
- Drag & drop
- URL kopyalama
- Dosya silme
- Önizleme

## 📖 Dokümantasyon

1. **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)**
   - Tüm özellikler detaylı
   - API kullanımı
   - Component örnekleri

2. **[PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md)**
   - Performance optimizasyonları
   - Best practices
   - Test araçları

3. **[PWA_ICON_GUIDE.md](./PWA_ICON_GUIDE.md)**
   - PWA icon gereksinimleri
   - Upload işlemi
   - Test etme

## 🎯 Performance

### Lighthouse Scores
- Performance: >90 ⚡
- Accessibility: >90 ♿
- Best Practices: >90 ✅
- SEO: >90 🔍

### Optimizasyonlar
✅ Image optimization (AVIF, WebP)
✅ Lazy loading
✅ Code splitting
✅ 1 yıl static cache
✅ Service Worker
✅ Bundle optimization

## 🔧 Teknolojiler

- **Next.js 16.0.3** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Turbopack** - Fast bundler

## 📁 Proje Yapısı

```
unified-website/
├── app/
│   ├── admin/
│   │   ├── dashboard-v2/   # Ana dashboard
│   │   ├── media/          # Medya yönetimi
│   │   ├── settings/       # ⚙️ Ayarlar (YENİ!)
│   │   └── login/          # Giriş
│   ├── api/
│   │   ├── admin/settings/ # Settings API (YENİ!)
│   │   ├── settings/       # Public settings (YENİ!)
│   │   └── ...
│   └── ...
├── components/
│   ├── AnalyticsWrapper.tsx    # Dynamic analytics (YENİ!)
│   ├── OptimizedImage.tsx      # Image optimization
│   ├── AccessibleButton.tsx    # Accessibility
│   └── ...
├── lib/
│   ├── settings.ts         # Settings management (YENİ!)
│   ├── accessibility.ts    # A11y utilities
│   ├── responsive.ts       # Responsive helpers
│   └── ...
├── data/
│   └── settings.json       # Settings data (YENİ!)
└── ...
```

## 🚀 Deployment

### Vercel (Önerilen)

```bash
git push
# Otomatik deploy
```

**Önemli:** Artık environment variables'a gerek yok! Tüm ayarlar admin panelden.

### Manuel Build

```bash
npm run build
npm run start
```

## 🐛 Sorun Giderme

### Analytics çalışmıyor
1. Admin Panel > ⚙️ Ayarlar > Analytics
2. "Analytics Sistemini Aktif Et" işaretli mi?
3. GA4 ID doğru mu? (G-XXXXXXXXXX)
4. Sayfayı yenile

### Ayarlar kayboldu
1. `data/settings.json` dosyası var mı?
2. Sıfırla butonuna tıklayın (varsayılana döner)

### PWA çalışmıyor
1. HTTPS gerekli (production)
2. Icons yüklendi mi? ([PWA_ICON_GUIDE.md](./PWA_ICON_GUIDE.md))
3. Service worker registered mı?

## 📊 Yenilikler v1.0.0

### ⚙️ Settings Sayfası
- **Tüm env variables admin panelden**
- Kod yazmaya gerek yok
- Real-time güncelleme
- Analytics dynamically loaded

### 🚀 Performance
- Image optimization aktif
- Bundle size optimized
- Lazy loading everywhere
- Static caching 1 yıl

### ♿ Accessibility
- WCAG 2.1 AA uyumlu
- Keyboard navigation
- Screen reader support
- ARIA labels

### 📱 PWA
- Offline support
- Push notifications
- Ana ekrana eklenebilir
- Service Worker

---

**Versiyon:** 1.0.0
**Tarih:** 2025-01-18
**Durum:** ✅ Production Ready

**Not:** Bu sistem kod bilgisi olmayan kullanıcılar için tasarlanmıştır. Tüm ayarlar admin panelden yapılabilir!
