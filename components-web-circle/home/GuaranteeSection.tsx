'use client'

import React, { useState } from 'react'
import { Shield, ArrowLeft } from 'lucide-react'
import { Container } from '@/components-web-circle/ui/Container'
import { Button } from '@/components-web-circle/ui/Button'
import { TypeformModal } from '@/components-web-circle/ui/TypeformModal'

export const GuaranteeSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
    <section id="guarantee" className="section">
      <Container>
        <div className="glow-card mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary-400/10">
            <Shield className="h-10 w-10 text-secondary-400" />
          </div>

          <h2 className="heading-lg mb-4">14 Günlük "Benim İçin Değilse Çık" Garantisi</h2>

          <p className="body mx-auto mb-8 max-w-2xl">
            Programın sana uygun olmadığını, içeriklerden ve topluluktan fayda alamadığını
            düşünürsen; ilk 14 gün içinde bize yazman yeterli.
          </p>

          <p className="body-lg mb-8 font-semibold text-white">
            Hiçbir bahane sormadan, "neden?" diye sorgulamadan ücretini iade ediyoruz.
          </p>

          <Button variant="primary" size="lg" className="mb-6" onClick={() => setIsModalOpen(true)}>
            Hemen Başla - 14 Gün Garanti ile
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <ArrowLeft className="h-4 w-4" />
            <span>
              Çünkü uzun vadede sadece gerçekten burada olmak isteyenlerle büyümek istiyoruz
            </span>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs text-gray-500">
              İade politikanı hukuken nasıl uygulayacağımızı avukatımızla netleştirdik. Bu metin
              pazarlama metnidir ve kullanım şartlarımızda detaylandırılmıştır.
            </p>
          </div>
        </div>
      </Container>
    </section>

    <TypeformModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
