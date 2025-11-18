'use client'

import React from 'react'
import { TrendingUp, Users, Award } from 'lucide-react'
import { Button } from '@/components-web-circle/ui/Button'
import { CheckoutButton } from '@/components-web-circle/ui/CheckoutButton'
import { Badge } from '@/components-web-circle/ui/Badge'
import { Container } from '@/components-web-circle/ui/Container'

export const Hero: React.FC = () => {
  return (
    <>
      <section id="hero" className="relative overflow-hidden bg-galaxy py-20 md:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary-400/20 blur-3xl" />

        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Content */}
            <div className="flex flex-col justify-center space-y-8">
              <Badge>Online Gelir Akademisi</Badge>

              <div className="space-y-4">
                <h1 className="heading-xl animate-fade-in">
                  Yeni Nesil Gelir Becerilerini{' '}
                  <span className="text-gradient">90 Günde Öğren</span>
                </h1>
                <p className="body-lg max-w-2xl animate-slide-up">
                  GelirHub, modern dünyada para kazandıran becerileri sıfırdan öğreten online bir
                  akademidir. Adım adım ilerleyen eğitimler, günlük canlı yayınlar ve seninle aynı
                  hedefe odaklanmış bir toplulukla yeni bir gelir hattı kurmana yardım eder.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <CheckoutButton variant="primary" size="lg">
                  Hemen Başla - $39/ay
                </CheckoutButton>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Programları İncele
                </Button>
              </div>

              {/* Trust Strip */}
              <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-8 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary-400" />
                  <span className="text-gray-300">
                    <span className="font-semibold text-white">10.000+</span> katılımcı
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary-400" />
                  <span className="text-gray-300">Günlük canlı yayın</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary-400" />
                  <span className="text-gray-300">
                    <span className="font-semibold text-white">%92</span> memnuniyet
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - YouTube Video */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div className="glow-card animate-glow overflow-hidden">
                  <div className="relative aspect-video w-full">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube.com/embed/qQbl1YPaI7k?start=335&rel=0&modestbranding=1"
                      title="GelirHub Tanıtım Videosu"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">Platform tanıtım videosu</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
