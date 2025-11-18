'use client'

import React, { useState } from 'react'
import { Check, CreditCard, Shield, Zap } from 'lucide-react'
import { Container } from '@/components-web-circle/ui/Container'
import { SectionTitle } from '@/components-web-circle/ui/SectionTitle'
import { Button } from '@/components-web-circle/ui/Button'
import { mainPlan } from '@/lib-web-circle/pricing'

export const PricingSection: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="pricing" className="section">
      <Container>
        <SectionTitle
          eyebrow="Fiyatlandırma"
          title="Tek Plan, Tüm Erişim"
          description="Karmaşık paketler yok. Sadece tek bir fiyat ile tüm içeriğe, canlı yayınlara ve topluluğa sınırsız erişim."
        />

        {/* Main Pricing Card */}
        <div className="mx-auto max-w-lg">
          <div className="relative overflow-hidden rounded-2xl border border-primary-400/20 bg-gradient-to-br from-dark-900 to-dark-950 p-6">
            {/* Price Header */}
            <div className="mb-6 text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-400/10">
                <Zap className="h-8 w-8 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{mainPlan.name}</h3>
              <p className="text-sm text-gray-400">{mainPlan.description}</p>
            </div>

            {/* Price Display */}
            <div className="mb-6 text-center">
              <div className="mb-2 flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-white">${mainPlan.price}</span>
                <span className="text-lg text-gray-400">/ay</span>
              </div>
              <p className="text-xs text-gray-500">İstediğin zaman iptal et</p>
            </div>

            {/* Features List */}
            <ul className="mb-6 space-y-3">
              {mainPlan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-400" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Yönlendiriliyor...' : 'Hemen Başla - $39/ay'}
            </Button>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center justify-center gap-6 border-t border-white/10 pt-5 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Güvenli ödeme</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Stripe ile korumalı</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 grid gap-6 text-center md:grid-cols-3">
          <div>
            <h4 className="mb-1 text-sm font-semibold text-white">Ne zaman iptal edebilirim?</h4>
            <p className="text-xs text-gray-400">
              İstediğin zaman. Sonraki dönem için otomatik ücret alınmaz.
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-semibold text-white">14 günlük garanti var mı?</h4>
            <p className="text-xs text-gray-400">
              Evet. İlk 14 gün içinde koşulsuz iade alabilirsin.
            </p>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-semibold text-white">Ödemeler güvenli mi?</h4>
            <p className="text-xs text-gray-400">
              Evet. Tüm ödemeler Stripe ile SSL şifrelemesi altında işlenir.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
