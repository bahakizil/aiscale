# Vercel Deployment Guide

## Vercel'e Deployment İçin 2 Seçenek:

### Seçenek 1: GitHub + Vercel Dashboard (ÖNERİLEN)

1. **GitHub Repository Oluştur:**
   - https://github.com/new adresine git
   - Repository adı: `unified-website` (veya istediğin isim)
   - Public veya Private seç
   - **ÖNEMLİ:** README, .gitignore ekleme - zaten var

2. **Kodu GitHub'a Push Et:**
   ```bash
   git remote add origin https://github.com/KULLANICI_ADIN/unified-website.git
   git branch -M main
   git push -u origin main
   ```

3. **Vercel'de Deploy Et:**
   - https://vercel.com adresine git
   - "Add New Project" tıkla
   - GitHub repository'ni seç
   - "Import" tıkla
   - Deploy otomatik başlayacak!

4. **Production URL:**
   - Deploy bittikten sonra Vercel sana `https://unified-website.vercel.app` gibi bir URL verecek
   - Custom domain ekleyebilirsin

---

### Seçenek 2: Vercel CLI (Manuel)

1. **Terminal'de Giriş Yap:**
   ```bash
   vercel login
   ```
   - Email adresini gir
   - Email'e gelen linke tıkla

2. **Deploy Et:**
   ```bash
   vercel
   ```
   - Soruları cevapla (genellikle Enter'a basarak default'ları kabul edebilirsin)

3. **Production'a Deploy Et:**
   ```bash
   vercel --prod
   ```

---

## Deployment Sonrası Yapılacaklar:

### 1. Data Klasörünü Oluştur
Vercel'de `data/settings.json` dosyası otomatik oluşturulmayacak. İlk admin login'den sonra otomatik oluşacak.

### 2. Environment Variables (Opsiyonel)
Vercel Dashboard'da Project Settings > Environment Variables'a git:
- `NODE_ENV=production`

### 3. Admin Paneline Giriş
- `https://YOUR-DOMAIN.vercel.app/admin/login` adresine git
- Default: `admin` / `admin123`
- **ÖNEMLİ:** İlk girişten sonra şifreyi değiştir!

### 4. Settings Yapılandır
- `https://YOUR-DOMAIN.vercel.app/admin/settings` adresine git
- Google Analytics ID'sini gir
- Facebook Pixel ID'sini gir
- PWA ayarlarını yap
- Dil ayarlarını yapılandır

---

## Önemli Notlar:

✅ **Otomatik Build:** Her git push'ta Vercel otomatik build yapacak
✅ **HTTPS:** Vercel otomatik SSL sertifikası veriyor
✅ **PWA:** HTTPS olduğu için PWA özellikleri çalışacak
✅ **Performance:** Vercel'in Edge Network'ü sayesinde hızlı
✅ **Rollback:** Dashboard'dan eski versiyonlara geri dönebilirsin

---

## Deployment Status:

- ✅ Code committed (commit: ed20188)
- ✅ Vercel config created
- ⏳ Waiting for GitHub push or Vercel login

---

## Yardım:

Sorun yaşarsan:
1. Vercel Dashboard'daki build logs'a bak
2. `vercel logs` komutuyla production logs'u incele
3. Vercel Support: https://vercel.com/support
