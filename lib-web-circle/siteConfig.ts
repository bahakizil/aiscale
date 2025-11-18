export const siteConfig = {
  name: "GelirHub",
  description: "Yeni nesil gelir becerileri ve online iş akademisi",
  tagline: "Gelir becerilerini 90 günde dönüştür",
  url: "https://gelirhub.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/gelirhub",
    instagram: "https://instagram.com/gelirhub",
    linkedin: "https://linkedin.com/company/gelirhub",
  },
  nav: [
    {
      title: "Ana Sayfa",
      href: "#hero",
    },
    {
      title: "Programlar",
      href: "#programs",
    },
    {
      title: "Topluluk",
      href: "#community",
    },
    {
      title: "Fiyatlandırma",
      href: "#pricing",
    },
    {
      title: "SSS",
      href: "#faq",
    },
  ],
  stats: [
    {
      value: "10.000+",
      label: "Katılımcı",
    },
    {
      value: "7+",
      label: "Program alanı",
    },
    {
      value: "Günde 1 saat",
      label: "Canlı ders & soru-cevap",
    },
    {
      value: "50+ ülke",
      label: "Global topluluk",
    },
  ],
}

export type SiteConfig = typeof siteConfig
