import React from 'react'
import { MessageSquare, Target, TrendingUp } from 'lucide-react'
import { Container } from '@/components-web-circle/ui/Container'
import { SectionTitle } from '@/components-web-circle/ui/SectionTitle'
import { Card } from '@/components-web-circle/ui/Card'

const communityFeatures = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Aynı hedefte insanlar',
    description: 'Senden daha ilerde olanlardan öğren, senden geride olanlara yardım et.',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Gerçek sonuçlar',
    description: '"İlk satışım geldi", "İlk müşterimi buldum" mesajlarını canlı canlı gör.',
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Kutlanan başarılar',
    description: 'Küçük wins\'leri bile paylaşabildiğin, motivasyonu yüksek bir ortam.',
  },
]

const successStories = [
  {
    result: '🎉 İlk satış!',
    description: 'E-ticaret programında 3. haftasında ilk satışını yapan Mehmet',
  },
  {
    result: '💰 İlk 1000$/ay',
    description: 'Freelance yazarlıktan ilk 1000 dolarını kazanan Ayşe',
  },
  {
    result: '🚀 Kurumsaldan çıkış',
    description: 'Müşteri edinme ile yan gelirini maaşına eşitleyen Burak',
  },
]

export const CommunityStrip: React.FC = () => {
  return (
    <section id="community" className="section bg-dark-900/50">
      <Container>
        <SectionTitle
          eyebrow="Topluluk"
          title="Yalnız Değilsin: Senin Gibi Düşünen İnsanlarla Aynı Yoldasın"
          description="Çevrende seninle aynı hedeflere odaklanan, 'daha fazlasını isteyen' kaç kişi var? GelirHub topluluğunda, yeni gelir hattı kurmak isteyen binlerce kişiyle aynı ortamı paylaşırsın."
        />

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {communityFeatures.map((feature, index) => (
            <Card key={index} className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-400/10 text-primary-400">
                {feature.icon}
              </div>
              <h3 className="heading-sm mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div>
          <h3 className="heading-md mb-8 text-center">Topluluktan Son Başarılar</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="rounded-xl border border-secondary-400/20 bg-secondary-400/5 p-6"
              >
                <div className="mb-2 text-2xl font-bold text-secondary-400">{story.result}</div>
                <p className="text-sm text-gray-300">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
