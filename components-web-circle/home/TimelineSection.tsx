import React from 'react'
import { Container } from '@/components-web-circle/ui/Container'
import { SectionTitle } from '@/components-web-circle/ui/SectionTitle'

const timeline = [
  {
    period: 'Gün 1–7',
    title: 'Zemin Hazırlığı',
    description:
      'Hedefini netleştirir, hangi program alanından başlayacağına karar verirsin. Gerekli hesapları açar, minimum ekipman ve araçları kurarsın.',
  },
  {
    period: 'Hafta 2–4',
    title: 'İlk Denemeler ve İlk Mikro Sonuçlar',
    description:
      'İlk içeriklerini, ilk ürün denemelerini veya ilk müşteri mesajlarını gönderirsin. Henüz mükemmel olmak zorunda değilsin; önemli olan harekete geçmek.',
  },
  {
    period: 'Hafta 5–8',
    title: 'İlk Tutarlı Sonuçlar',
    description:
      'Nelerin işe yaradığını görmeye başlarsın. Buna göre teklifini, içerik tarzını veya ürün seçimini optimize eder, tekrar eden adımları sistemleştirirsin.',
  },
  {
    period: 'Hafta 9–12',
    title: 'Ölçeklemenin Temelleri',
    description:
      'Artık tek tek deneme yapmak yerine, çalışan şeyleri büyütmeye odaklanırsın: daha fazla içerik, daha fazla teklif, daha iyi sistemler ve daha güçlü bir rutin.',
  },
]

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="section bg-dark-900/50">
      <Container>
        <SectionTitle
          eyebrow="90 Günlük Plan"
          title="İlk 90 Günde Neler Olur?"
          description="Herkesin hızı farklı ama yapı aynı. GelirHub içinde geçireceğin ilk 90 günü genel olarak şöyle planlıyoruz:"
        />

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary-400 to-secondary-400 md:block" />

          <div className="space-y-8">
            {timeline.map((phase, index) => (
              <div key={index} className="relative flex gap-6 md:gap-8">
                {/* Timeline Dot */}
                <div className="hidden flex-shrink-0 md:block">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-dark-950 bg-gradient-to-br from-primary-400 to-secondary-400">
                    <span className="text-lg font-bold text-dark-950">{index + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="glass-card flex-1">
                  <div className="mb-2 inline-block rounded-full bg-primary-400/10 px-3 py-1 text-xs font-semibold text-primary-400">
                    {phase.period}
                  </div>
                  <h3 className="heading-sm mb-2">{phase.title}</h3>
                  <p className="text-sm text-gray-400">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
