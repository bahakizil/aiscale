export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  currency: string
  features: string[]
  stripePriceId?: string
}

export const mainPlan: PricingPlan = {
  id: "gelirhub-monthly",
  name: "GelirHub Üyelik",
  description: "Tüm programlara ve topluluğa sınırsız erişim",
  price: 39,
  currency: "USD",
  features: [
    "Tüm 6 program alanına tam erişim",
    "Günlük canlı yayınlara katılım + kayıt arşivi",
    "Ödev incelemesi ve grup geri bildirimi",
    "Topluluk ve networking kanallarına erişim",
    "Haftalık stratejik oturumlar",
    "Mobil uygulamadan erişim",
    "7/24 platform desteği",
    "İlk 14 gün koşulsuz iade garantisi",
  ],
  // Stripe Price ID - dashboard'dan oluşturup buraya eklenecek
  stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
}
