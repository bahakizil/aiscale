import React from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-dark-950 py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-secondary-400/10">
            <CheckCircle className="h-12 w-12 text-secondary-400" />
          </div>

          <h1 className="heading-lg mb-4">Hoş Geldin! 🎉</h1>

          <p className="body-lg mb-8 text-gray-300">
            Ödemen başarıyla tamamlandı. GelirHub ailesine katıldığın için teşekkürler!
          </p>

          <div className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h2 className="heading-sm mb-4">Sıradaki Adımlar</h2>
            <ul className="space-y-4 text-left">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-400/10 text-xs font-bold text-primary-400">
                  1
                </div>
                <div>
                  <div className="font-semibold text-white">E-postanı kontrol et</div>
                  <div className="text-sm text-gray-400">
                    Giriş bilgilerin ve ilk adımlar e-posta adresine gönderildi
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-400/10 text-xs font-bold text-primary-400">
                  2
                </div>
                <div>
                  <div className="font-semibold text-white">Hesabını oluştur</div>
                  <div className="text-sm text-gray-400">
                    Platformumuza giriş yap ve profilini tamamla
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-400/10 text-xs font-bold text-primary-400">
                  3
                </div>
                <div>
                  <div className="font-semibold text-white">İlk programını seç</div>
                  <div className="text-sm text-gray-400">
                    6 program alanından hangisiyle başlayacağına karar ver
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="default" size="lg" asChild>
              <a href="mailto:support@gelirhub.com">
                Destek İçin İletişime Geç
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/">Ana Sayfaya Dön</Link>
            </Button>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>Sorularınız için: support@gelirhub.com</p>
          </div>
        </div>
      </Container>
    </div>
  )
}
