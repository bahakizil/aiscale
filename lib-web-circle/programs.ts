export interface Program {
  id: string
  title: string
  description: string
  icon: string
  benefits: string[]
  level: "Başlangıç" | "Orta" | "İleri"
  dailyTime: string
  featured?: boolean
}

export const programs: Program[] = [
  {
    id: "e-ticaret",
    title: "E-Ticaret: Ürün Sat, Gelirini Büyüt",
    description:
      "Fiziksel ya da dijital ürünlerini, sıfırdan kuracağın online mağaza üzerinden tüm dünyaya satmayı öğren.",
    icon: "ShoppingCart",
    benefits: [
      "Kârlı ürün araştırma ve niş seçimi",
      "Mağaza kurulumu, tasarımı ve güvenli ödeme",
      "Reklam, organik trafik ve dönüşüm optimizasyonu",
    ],
    level: "Başlangıç",
    dailyTime: "1-2 saat",
    featured: true,
  },
  {
    id: "icerik-ai",
    title: "İçerik & Yapay Zekâ: Görünürlüğünü ve Gelirini Katla",
    description:
      "Kısa videolar, klipler ve AI destekli içerik akışlarıyla sosyal medyada hem erişimini hem de gelirini artır.",
    icon: "Video",
    benefits: [
      "Kısa video formatları ve hikâye kurgusu",
      "Yapay zekâ ile hızlı içerik üretimi",
      "Kişisel marka ve içerikten gelir modelleri",
    ],
    level: "Başlangıç",
    dailyTime: "1-2 saat",
    featured: true,
  },
  {
    id: "musteri-edinme",
    title: "Müşteri Edinme: Soğuk Mesajdan Sadık Müşteriye",
    description:
      "Ajans, freelancer veya danışman olarak; LinkedIn, e-posta ve sosyal medya üzerinden düzenli müşteri bulmayı öğren.",
    icon: "Users",
    benefits: [
      "Hedef kitle ve ideal müşteri profili çıkarma",
      "Soğuk e-posta & DM şablonları",
      "Toplantı alma, teklif sunma ve kapatma süreçleri",
    ],
    level: "Orta",
    dailyTime: "1-2 saat",
  },
  {
    id: "serbest-calisma",
    title: "Serbest Çalışma: Becerini Sat, Özgür Çalış",
    description:
      "Tasarım, video, otomasyon, yazı yazma gibi becerilerini paketleyip hızlıca nakde çevirebileceğin mikro hizmetler oluştur.",
    icon: "Briefcase",
    benefits: [
      "Becerini ürüne dönüştürme (productized service)",
      "Fiyatlama, paketleme, teklif hazırlama",
      "Platformlarda ve direkt satışta öne çıkma",
    ],
    level: "Başlangıç",
    dailyTime: "1-2 saat",
  },
  {
    id: "is-becerileri",
    title: "İş Becerileri & Zihniyet: Uzun Vadeli Oyun",
    description:
      "Sadece para kazanmak değil, sürdürülebilir performans ve net düşünme becerileri geliştirmek için.",
    icon: "Brain",
    benefits: [
      "Zaman yönetimi ve derin çalışma alışkanlıkları",
      "Karar alma, risk yönetimi, odak",
      "Kazan-kazan ilişkiler kurma ve liderlik temelleri",
    ],
    level: "Orta",
    dailyTime: "45-60 dakika",
  },
  {
    id: "saglik-performans",
    title: "Sağlık & Performans: Enerjini İşine Taşı",
    description:
      "Zihinsel berraklık, odak ve dayanıklılık için beslenme, uyku ve hareket düzenini optimize et.",
    icon: "Activity",
    benefits: [
      "Temel beslenme ve uyku prensipleri",
      "Üretkenliği artıran mikro alışkanlıklar",
      "Ekran başında çalışanlar için rutine uygun egzersizler",
    ],
    level: "Başlangıç",
    dailyTime: "30-45 dakika",
  },
]
