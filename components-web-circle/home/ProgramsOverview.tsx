import React from 'react'
import {
  ShoppingCart,
  Video,
  Users,
  Briefcase,
  Brain,
  Activity,
  ArrowRight
} from 'lucide-react'
import { Container } from '@/components-web-circle/ui/Container'
import { SectionTitle } from '@/components-web-circle/ui/SectionTitle'
import { Card } from '@/components-web-circle/ui/Card'
import { Badge } from '@/components-web-circle/ui/Badge'
import { programs } from '@/lib-web-circle/programs'

const iconMap: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="h-8 w-8" />,
  Video: <Video className="h-8 w-8" />,
  Users: <Users className="h-8 w-8" />,
  Briefcase: <Briefcase className="h-8 w-8" />,
  Brain: <Brain className="h-8 w-8" />,
  Activity: <Activity className="h-8 w-8" />,
}

export const ProgramsOverview: React.FC = () => {
  return (
    <section id="programs" className="section">
      <Container>
        <SectionTitle
          eyebrow="Program Alanları"
          title="Hangi Yoldan İlerleyeceksin?"
          description="Online gelir elde etmek için farklı yollar var. Seviyene ve hedefine göre ilerleyebileceğin birden fazla program alanı bulunur."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Card key={program.id} className="group transition-transform hover:scale-105">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-400/10 text-primary-400">
                  {iconMap[program.icon]}
                </div>
                {program.featured && <Badge variant="success">Popüler</Badge>}
              </div>

              <h3 className="heading-sm mb-3">{program.title}</h3>
              <p className="mb-4 text-sm text-gray-400">{program.description}</p>

              <ul className="mb-6 space-y-2">
                {program.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="text-xs text-gray-500">
                  <div>Seviye: {program.level}</div>
                  <div className="mt-1">Günlük: {program.dailyTime}</div>
                </div>
                <a
                  href={`#${program.id}`}
                  className="flex items-center gap-1 text-sm font-medium text-primary-400 transition-colors hover:text-primary-300"
                >
                  Detayları Gör
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
