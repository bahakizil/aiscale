import React from 'react'
import { Calendar, Clock, Radio } from 'lucide-react'
import { Container } from '@/components-web-circle/ui/Container'
import { SectionTitle } from '@/components-web-circle/ui/SectionTitle'
import { Card } from '@/components-web-circle/ui/Card'

const schedule = [
  {
    day: 'Pazartesi',
    time: '20:00',
    topic: 'E-Ticaret: Ürün araştırma canlı çalışma',
    instructor: 'Ahmet Yılmaz',
  },
  {
    day: 'Salı',
    time: '20:00',
    topic: 'İçerik & AI: 3 video 1 saat içinde',
    instructor: 'Zeynep Kaya',
  },
  {
    day: 'Çarşamba',
    time: '20:00',
    topic: 'Müşteri edinme: Canlı DM & e-posta incelemeleri',
    instructor: 'Mehmet Demir',
  },
  {
    day: 'Perşembe',
    time: '20:00',
    topic: 'İş becerileri: Zaman planlama & haftalık review',
    instructor: 'Ayşe Şahin',
  },
  {
    day: 'Cuma',
    time: '20:00',
    topic: 'Soru-cevap & hesap verme oturumu',
    instructor: 'Tüm Eğitmenler',
  },
]

export const DailyLiveSection: React.FC = () => {
  return (
    <section id="daily-live" className="section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Content */}
          <div className="flex flex-col justify-center space-y-6">
            <SectionTitle
              eyebrow="Canlı Eğitim"
              title="Her Gün 1 Saat Canlı Yayın ve Soru-Cevap"
              className="text-left"
            />

            <div className="space-y-4 text-gray-300">
              <p className="body">
                GelirHub sadece kayıtlı videolardan oluşan bir "kurs" değil. Her gün, alanında
                deneyimli eğitmenlerle canlı yayınlara katılır, sorularını gerçek zamanlı sorarsın.
              </p>
              <p className="body">
                Her yayın, bir iş modelindeki somut bir adımı anlatır. Yayından çıktıktan sonra, o
                gün ne yapman gerektiğini net olarak bilirsin.
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-400/10">
                  <Radio className="h-3 w-3 text-primary-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Günlük canlı takvim</div>
                  <div className="text-sm text-gray-400">
                    Her hafta düzenli saat ve konular
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-400/10">
                  <Calendar className="h-3 w-3 text-primary-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Kayıt arşivi</div>
                  <div className="text-sm text-gray-400">
                    Katılamadıysan sonra izle
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-400/10">
                  <Clock className="h-3 w-3 text-primary-400" />
                </div>
                <div>
                  <div className="font-semibold text-white">Başlangıç seviyesine uygun</div>
                  <div className="text-sm text-gray-400">
                    Hiç deneyimin olmasa bile takip edebilirsin
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Right - Schedule Card */}
          <div>
            <Card variant="glow">
              <h3 className="heading-sm mb-6">Bu Haftanın Programı</h3>
              <div className="space-y-4">
                {schedule.map((session, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0">
                      <div className="text-sm font-semibold text-primary-400">{session.day}</div>
                      <div className="text-xs text-gray-500">{session.time}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{session.topic}</div>
                      <div className="mt-1 text-xs text-gray-400">{session.instructor}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}
