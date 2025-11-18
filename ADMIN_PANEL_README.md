# Admin Panel - Kullanım Kılavuzu

## 🎯 Genel Bakış

Bu admin paneli ile web funnel sayfalarınızdaki tüm içeriği dinamik olarak değiştirebilirsiniz:
- ✅ Yazılar (başlıklar, açıklamalar, buton metinleri)
- ✅ Fiyatlar ve miktarlar
- ✅ Geri sayım tarih/saatleri
- ✅ Özellik listeleri
- ✅ Sonuç kartları
- ⏳ Görseller ve videolar (yakında eklenecek)

---

## 🔐 Giriş Bilgileri

**Admin Panel URL:** `http://localhost:3000/admin/login`

**Default Credentials:**
- **Kullanıcı Adı:** `admin`
- **Şifre:** `admin123`

> ⚠️ **ÖNEMLİ:** Production'a geçmeden önce `.env.local` dosyasındaki `ADMIN_USERNAME` ve `ADMIN_PASSWORD` değerlerini değiştirin!

---

## 🚀 Admin Panele Erişim

### Yöntem 1: Direkt URL
```
http://localhost:3000/admin/login
```

### Yöntem 2: Web Funnel'dan
1. Web funnel landing page'e gidin (`/webfunnel`)
2. En altta footer'da küçük ⚙️ ayar ikonu gizli buton olarak bulunur
3. Sadece mouse üzerine gelince görünür (opacity-30 → opacity-100)

---

## 📋 Admin Panel Özellikleri

### 1. **Dashboard Genel Görünüm**

Header'da şu butonlar bulunur:
- **📺 Preview** - Web funnel'ı yeni sekmede aç
- **🔄 Reset** - Tüm içeriği varsayılana sıfırla
- **💾 Kaydet** - Değişiklikleri kaydet
- **🚪 Çıkış** - Oturumu kapat

### 2. **Sekme Yapısı**

#### 📄 Landing Page Tab
- **Header Banner** - Üst kısımdaki sarı banner text
- **Ana Başlık** - 4 satırlık ana başlık + miktar gösterimi
- **Alt Başlık** - Açıklama metni
- **Etkinlik Tarihi & Sayaç**
  - Etkinlik tarihi text
  - Saat text
  - Geri sayım hedef tarihi (datetime picker)
- **CTA Butonu** - "EVET! YERİMİ AYIRT" button text
- **Özellikler** - 5 adet feature listesi
- **Sonuçlar Bölümü**
  - Başlık
  - 3 adet sonuç kartı (miktar + açıklama)
  - Disclaimer metni

#### 💳 Checkout Page Tab
- **Onay Bannerı** - Üst kısım onay mesajı
- **Paket Başlığı** - "AI Arbitrage Hızlandırılmış Paket"
- **Fiyatlandırma**
  - Eski fiyat (örn: $497.00)
  - Yeni fiyat (örn: $27)
  - Para birimi (USD, TRY, vb.)
- **Paket Özellikleri** - 7 adet feature (renk seçimi ile)
  - 🔴 Kırmızı veya 🟠 Turuncu bullet
- **Butonlar**
  - CTA button text
  - "Hayır teşekkürler" button text

#### ✅ Success Page Tab
- **Başlık** - Başarı mesajı
- **Alt Başlık** - Açıklama
- **Etkinlik Tarihi** - Text
- **Geri Sayım Hedefi** - Datetime

---

## 💾 İçerik Saklama

İçerik `/data/webfunnel-content.json` dosyasında JSON formatında saklanır.

**Dosya Yapısı:**
```json
{
  "landing": { ... },
  "checkout": { ... },
  "success": { ... }
}
```

> ⚠️ `.gitignore` içinde `/data/*.json` eklenmiştir, bu yüzden içerik dosyaları Git'e commit edilmez.

---

## 🔄 İçerik Güncelleme Süreci

1. **Admin Panel'e Giriş Yap**
   - `/admin/login` sayfasına git
   - Kullanıcı adı ve şifre ile giriş yap

2. **İçeriği Düzenle**
   - İstediğin sekmeyi seç (Landing/Checkout/Success)
   - Form alanlarını düzenle
   - Geri sayım tarihleri için datetime picker kullan

3. **Değişiklikleri Kaydet**
   - Header'daki **💾 Kaydet** butonuna tıkla
   - "İçerik başarıyla kaydedildi!" mesajı görünecek

4. **Önizleme**
   - **📺 Preview** butonuna tıkla
   - Değişiklikler anında web funnel'da görünür

---

## 🎨 Özelleştirme İpuçları

### Geri Sayım Tarihi Ayarlama

Datetime picker kullanarak kolayca tarih seçin:
- **Landing Page** - Ana sayfa için geri sayım
- **Success Page** - Başarı sayfası için geri sayım

Format: `YYYY-MM-DDTHH:mm` (ISO 8601)

### Feature Renkleri (Checkout Page)

Her feature için renk seçebilirsiniz:
- **🔴 Kırmızı** - Temel özellikler için
- **🟠 Turuncu** - Premium özellikler için

### Sıfırlama

Eğer bir şeyler ters giderse:
1. **🔄 Reset** butonuna tıklayın
2. Onay verin
3. Tüm içerik varsayılan değerlere döner

---

## 🔒 Güvenlik

### Production Önerileri

1. **Şifre Değiştir**
   ```bash
   # .env.local dosyasında
   ADMIN_USERNAME=yeni_kullanici_adi
   ADMIN_PASSWORD=guclu_sifre_123!@#
   ```

2. **Session Güvenliği**
   - Varsayılan session süresi: 24 saat
   - HTTPS kullanın (production'da)

3. **Database Kullanımı**
   - İleride PostgreSQL/MongoDB eklenebilir
   - Şu an JSON file-based storage

---

## 🐛 Sorun Giderme

### "Unauthorized" Hatası

**Sebep:** Session süresi dolmuş veya geçersiz
**Çözüm:** Tekrar login olun

### Değişiklikler Görünmüyor

**Sebep:** Cache problemi
**Çözüm:** Sayfayı hard refresh yapın (Cmd+Shift+R / Ctrl+F5)

### "Failed to save content" Hatası

**Sebep:** `/data` klasörüne yazma izni yok
**Çözüm:**
```bash
chmod 755 /data
```

---

## 🚀 Gelecek Özellikler

- [ ] Görsel yükleme (image upload)
- [ ] Video URL yönetimi
- [ ] Çoklu dil desteği
- [ ] Revision history (değişiklik geçmişi)
- [ ] A/B testing
- [ ] Analytics entegrasyonu
- [ ] Email şablon yönetimi
- [ ] User roles (admin, editor, viewer)

---

## 📞 Destek

Sorularınız için:
- GitHub Issues
- Documentation: `/OPTIMIZATION_GUIDE.md`

---

**Son Güncelleme:** 18 Kasım 2025
