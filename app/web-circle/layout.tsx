import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components-web-circle/layout/SiteHeader'
import { SiteFooter } from '@/components-web-circle/layout/SiteFooter'
import { siteConfig } from '@/lib-web-circle/siteConfig'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'online gelir',
    'gelir becerileri',
    'e-ticaret',
    'içerik üretimi',
    'yapay zeka',
    'freelance',
    'girişimcilik',
    'online eğitim',
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
}

export default function WebCircleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`web-circle-site ${inter.className}`}>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  )
}
