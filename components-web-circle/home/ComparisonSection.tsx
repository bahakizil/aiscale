'use client'

import React from 'react'
import { X, Check } from 'lucide-react'
import { Container } from '@/components-web-circle/ui/Container'
import { SectionTitle } from '@/components-web-circle/ui/SectionTitle'
import { CheckoutButton } from '@/components-web-circle/ui/CheckoutButton'

const leftPath = [
  'YouTube\'dan videoya atlayıp her hafta yeni yöntem dene',
  'Kimin gerçekten sonuç aldığını bilmeden tavsiye takip et',
  'Aylarca ciddi bir gelir göremeden motivasyon kaybet',
  'Tek başına, yalnız ve hedefsiz ilerle',
]

const rightPath = [
  'Tek yerde, adım adım ilerleyen müfredat',
  'Günlük canlı yayınlarla sürekli güncellenen bilgi',
  'Hedeflerini bilen topluluk ve eğitmenlerle aynı ortam',
  'Her gün ne yapman gerektiğini net olarak bil',
]

export const ComparisonSection: React.FC = () => {
  return (
    <section id="comparison" className="section">
      <Container>
        <SectionTitle
          eyebrow="İki Yol"
          title="Hangisini Seçeceksin?"
          description="İlerlemek için iki farklı yol var. Birinde rastgele deniyorsun, diğerinde sistemli ilerliyorsun."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Card - Random Path */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
            <div className="mb-6 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <X className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="heading-md text-red-400">Rastgele Denemeler</h3>
              <p className="mt-2 text-sm text-gray-400">Yıllar kaybedip yine sıfırda kalmak</p>
            </div>

            <ul className="space-y-4">
              {leftPath.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                  <span className="text-sm text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card - Systematic Path */}
          <div className="rounded-2xl border border-primary-400/30 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 p-8">
            <div className="mb-6 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-400/20">
                <Check className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="heading-md text-primary-400">Sistemli Öğrenme</h3>
              <p className="mt-2 text-sm text-gray-300">
                Tek platform, net yol haritası ile ilerle
              </p>
            </div>

            <ul className="mb-8 space-y-4">
              {rightPath.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-400" />
                  <span className="text-sm text-white">{item}</span>
                </li>
              ))}
            </ul>

            <CheckoutButton variant="primary" size="lg" className="w-full">
              Sistemli Tarafa Geç - $39/ay
            </CheckoutButton>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          Rastgele denemeyi bırak, sistemli tarafa geç ve 90 günde ilk sonuçlarını al.
        </p>
      </Container>
    </section>
  )
}
