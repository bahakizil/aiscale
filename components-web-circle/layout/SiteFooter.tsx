import React from 'react'
import Link from 'next/link'
import { Twitter, Instagram, Linkedin } from 'lucide-react'
import { Container } from '@/components-web-circle/ui/Container'
import { siteConfig } from '@/lib-web-circle/siteConfig'

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { title: 'Programlar', href: '#programs' },
      { title: 'Topluluk', href: '#community' },
      { title: 'Fiyatlandırma', href: '#pricing' },
      { title: 'SSS', href: '#faq' },
    ],
    legal: [
      { title: 'Kullanım Şartları', href: '#terms' },
      { title: 'Gizlilik Politikası', href: '#privacy' },
      { title: 'KVKK', href: '#kvkk' },
      { title: 'İptal ve İade', href: '#refund' },
    ],
  }

  return (
    <footer className="border-t border-white/5 bg-dark-950">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/web-circle" className="mb-4 inline-flex items-center space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-secondary-400">
                  <span className="text-xl font-bold text-dark-950">GH</span>
                </div>
                <span className="text-xl font-bold text-white">{siteConfig.name}</span>
              </Link>
              <p className="mb-6 max-w-md text-sm text-gray-400">
                {siteConfig.description} — Modern dünyada para kazandıran becerileri öğren, toplulukla
                büyü.
              </p>
              <div className="flex space-x-4">
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Platform
              </h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Hukuki
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 border-t border-white/5 pt-8">
            <p className="mb-4 text-xs leading-relaxed text-gray-500">
              {siteConfig.name} bir eğitim ve beceri geliştirme platformudur. Buradaki hiçbir içerik;
              yatırım tavsiyesi, hukuki veya finansal danışmanlık yerine geçmez. Gelir örnekleri, geçmiş
              katılımcıların deneyimlerine dayanır ve gelecekteki kazançların garantisi değildir. Elde
              edeceğin sonuçlar; tecrüben, çaban, risk iştahın ve piyasa koşullarına göre değişir.
            </p>
            <p className="text-xs text-gray-500">
              © {currentYear} {siteConfig.name}. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
