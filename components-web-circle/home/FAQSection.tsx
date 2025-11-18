'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components-web-circle/ui/Container'
import { SectionTitle } from '@/components-web-circle/ui/SectionTitle'
import { faqs } from '@/lib-web-circle/faq'

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section">
      <Container>
        <SectionTitle
          eyebrow="Sıkça Sorulan Sorular"
          title="Merak Ettiklerini Yanıtlayalım"
          description="Platform, içerikler ve üyelik hakkında en çok sorulan sorular."
        />

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card overflow-hidden transition-all hover:border-white/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-primary-400 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-sm leading-relaxed text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
