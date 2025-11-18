import React from 'react'
import { Container } from '@/components-web-circle/ui/Container'
import { siteConfig } from '@/lib-web-circle/siteConfig'

export const StatsStrip: React.FC = () => {
  return (
    <section className="section">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.stats.map((stat, index) => (
            <div
              key={index}
              className="glass-card text-center transition-transform hover:scale-105"
            >
              <div className="text-3xl font-bold text-primary-400 md:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
