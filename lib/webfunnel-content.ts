import fs from 'fs';
import path from 'path';

export interface WebFunnelContent {
  // Landing Page
  landing: {
    headerBanner: string;
    mainHeadline: {
      line1: string;
      line2: string;
      line3: string;
      line4: string;
      amount: string;
    };
    subHeadline: string;
    eventDate: string;
    eventTime: string;
    countdownTarget: string; // ISO date string
    ctaButton: string;
    sectionTitle: string;
    features: Array<{
      id: number;
      text: string;
    }>;
    results: {
      title: string;
      cards: Array<{
        id: number;
        amount: string;
        description: string;
      }>;
      disclaimer: string;
    };
  };

  // Checkout Page
  checkout: {
    confirmationBanner: string;
    eventInfo: string;
    packageTitle: string;
    features: Array<{
      id: number;
      text: string;
      color: 'red' | 'orange';
    }>;
    pricing: {
      originalPrice: string;
      currentPrice: string;
      currency: string;
    };
    ctaButton: string;
    noThanksButton: string;
  };

  // Success Page
  success: {
    title: string;
    subtitle: string;
    eventDate: string;
    countdownTarget: string;
  };
}

const CONTENT_FILE = path.join(process.cwd(), 'data', 'webfunnel-content.json');

// Default content
const DEFAULT_CONTENT: WebFunnelContent = {
  landing: {
    headerBanner: '%100 ÜCRETSİZ BLACK FRIDAY ETKİNLİGİ AÇIKLIYOR...',
    mainHeadline: {
      line1: "Sıradan İnsanların 2025'te",
      line2: "'Teknoloji Uzmanı' Olmadan Kullandığı",
      line3: "Az Bilinen Yapay Zeka İş Modeli İle",
      line4: "Kazanç...",
      amount: "$18,105+",
    },
    subHeadline: "Ve bunun Chatbot'lar, Telif Hakları, Ajanlar, SMMA, Affiliate Marketing, Ürün Lansmanı veya Diğer Guru Taktikleriyle Hiçbir İlgisi Yok",
    eventDate: "Pazar, 18 Kasım 2025",
    eventTime: "12:00 EST (19:00 Türkiye Saati)",
    countdownTarget: "2025-11-18T12:00:00-05:00",
    ctaButton: "EVET! YERİMİ AYIRT",
    sectionTitle: "Bu %100 ÜCRETSİZ Eğitimde Keşfedecekleriniz...",
    features: [
      { id: 1, text: "Yeni başlayanların HİÇBİR ön deneyim, teknik beceri veya araç gerekmeden karlı bir online iş başlatması için basit yöntem" },
      { id: 2, text: "Kodlama, teknik beceri veya yıllarca öğrenme gerektirmeden ayda $1500 - $5000 tekrarlayan süreç otomasyonu geliri nasıl yaratılır" },
      { id: 3, text: "AI Platformumuzun online iş kurmak için gereken işin %90'ını nasıl otomatikleştirdiği ve $25k MRR'ye nasıl ulaştığı" },
      { id: 4, text: "Premium fiyatlar nasıl talep edilir (ve haklı çıkarılır) - HERHANGİ bir geçmiş sonuç, referans, vaka çalışması veya teknik AI becerisi gerekmeden" },
      { id: 5, text: "Yılın sonu neden AI ve pazarlama patlamasıyla HERHANGİ bir online işi başlatmak ve büyütmek için bir ömürde bir kez olan bir fırsatı temsil ediyor" },
    ],
    results: {
      title: "Kendinden Emin Sonuçlar",
      cards: [
        { id: 1, amount: "$308,960", description: "1 AI işletme sahibinden 12 aylık gelir" },
        { id: 2, amount: "$18,105", description: "Müşteri başına ortalama aylık gelir" },
        { id: 3, amount: "$3,752", description: "Öğrencilerimiz için ortalama proje anlaşma değeri" },
      ],
      disclaimer: "Gösterilen gelir ve kazançlar tipik değildir. Bireysel sonuçlar değişiklik gösterir.",
    },
  },
  checkout: {
    confirmationBanner: "Pazar, 18 Kasım 2025 saat 12:00 EST (19:00 Türkiye Saati) Canlı Etkinliğe Katılmanız Onaylandı.",
    eventInfo: "Devam Etmeden Önce Aşağıdaki Önemli Daveti Okuyun",
    packageTitle: "AI Arbitrage Hızlandırılmış Paket",
    features: [
      { id: 1, text: "Pazar İstihbaratı Raporu - Şu anda AI çözümlerine aktif olarak yatırım yapan en yüksek fırsatlı 50 niş", color: 'red' },
      { id: 2, text: "Eksiksiz bütçe aralıkları, karar verici profilleri ve kanıtlanmış mesajlaşma çerçeveleri ilk ücretli müşterinizi imzalamak için", color: 'red' },
      { id: 3, text: "Canlı örnekler - Bu nişlere aktif olarak satış yapan müşterilerin örnekleri", color: 'red' },
      { id: 4, text: "AI Araç Seti - İşinizi otomatikleştirmek, büyütmek ve sistemleştirmek için 2025'te şu anda satılan tüm en iyi AI araçlarının tam dökümü", color: 'red' },
      { id: 5, text: "Tüm zamanların en çok dönüşüm sağlayan pazarlama kampanyaları", color: 'orange' },
      { id: 6, text: "7 günlük hızlı başlangıç sprint'i", color: 'orange' },
      { id: 7, text: "AI danışmanlarımızdan biriyle 1-1 görüşme", color: 'orange' },
    ],
    pricing: {
      originalPrice: "$497.00",
      currentPrice: "$27",
      currency: "USD",
    },
    ctaButton: "Satın Almayı Tamamla",
    noThanksButton: "Hayır teşekkürler, ilk ücretli müşteriyi edinmede AI Kısayolunu kaçıracağım.",
  },
  success: {
    title: "Kaydınız Tamamlandı!",
    subtitle: "Etkinlik detayları email adresinize gönderildi.",
    eventDate: "Pazar, 18 Kasım 2025 saat 12:00 EST",
    countdownTarget: "2025-11-18T12:00:00-05:00",
  },
};

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Get content from file or return default
export async function getWebFunnelContent(): Promise<WebFunnelContent> {
  try {
    ensureDataDirectory();

    if (!fs.existsSync(CONTENT_FILE)) {
      // Create default content file
      fs.writeFileSync(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2));
      return DEFAULT_CONTENT;
    }

    const fileContent = fs.readFileSync(CONTENT_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading webfunnel content:', error);
    return DEFAULT_CONTENT;
  }
}

// Save content to file
export async function saveWebFunnelContent(content: WebFunnelContent): Promise<void> {
  try {
    ensureDataDirectory();
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
  } catch (error) {
    console.error('Error saving webfunnel content:', error);
    throw new Error('Failed to save content');
  }
}

// Reset to default content
export async function resetWebFunnelContent(): Promise<void> {
  await saveWebFunnelContent(DEFAULT_CONTENT);
}
