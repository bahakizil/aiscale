'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { WebFunnelContent } from '@/lib/webfunnel-content';

export default function WebFunnelLandingClient({ initialContent }: { initialContent: WebFunnelContent }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [showModal, setShowModal] = useState(false);
  const content = initialContent.landing;

  useEffect(() => {
    const targetDate = new Date(content.countdownTarget);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [content.countdownTarget]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormSubmitted') {
        window.location.href = '/webfunnel/checkout';
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleSaveSeat = () => {
    setShowModal(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-2 px-4 text-center text-sm font-medium">
        {content.headerBanner}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Main Headline */}
        <div className="text-center mb-12 space-y-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight px-4">
            <span className="block mb-3">{content.mainHeadline.line1}</span>
            <span className="block mb-3">{content.mainHeadline.line2}</span>
            <span className="block mb-3">{content.mainHeadline.line3}</span>
            <span className="block text-yellow-400">
              {content.mainHeadline.amount} <span className="italic text-gray-300 text-3xl md:text-4xl">(ortalama)</span> {content.mainHeadline.line4}
            </span>
          </h1>

          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-red-400 text-base md:text-lg leading-relaxed px-4">
              {content.subHeadline}
            </p>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 inline-block">
              <p className="text-yellow-400 text-sm md:text-base font-semibold">
                ⏰ Etkinlik Başlangıcı: {content.eventDate} saat {content.eventTime} ⏰
              </p>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="bg-white text-black rounded-lg p-4 min-w-[80px] text-center">
            <div className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="text-xs uppercase">Saat</div>
          </div>
          <div className="bg-white text-black rounded-lg p-4 min-w-[80px] text-center">
            <div className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="text-xs uppercase">Dakika</div>
          </div>
          <div className="bg-white text-black rounded-lg p-4 min-w-[80px] text-center">
            <div className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="text-xs uppercase">Saniye</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleSaveSeat}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xl py-6 px-12 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            {content.ctaButton}
          </button>
        </div>

        {/* Social Proof Stars */}
        <div className="flex justify-center items-center gap-2 mb-12">
          <div className="flex gap-1 text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-700"></div>
            ))}
          </div>
        </div>

        {/* Main Content Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-10 mb-8 shadow-2xl border border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Image Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-700">
                <div className="text-center p-6">
                  <div className="text-7xl mb-6">👨‍💼</div>
                  <p className="text-sm text-gray-400 font-medium">Founder of The AI Acquisition Method</p>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                {content.sectionTitle}
              </h2>

              <div className="space-y-5">
                {content.features.map((feature, index) => (
                  <div key={feature.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex-shrink-0 mt-1 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-gray-200 text-base leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second CTA */}
        <div className="text-center mb-12">
          <button
            onClick={handleSaveSeat}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xl py-6 px-12 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            EVET! ŞİMDİ YERİMİ AYIRT
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 mb-8 shadow-2xl border border-gray-700">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-white">Kendinden Emin</span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-teal-400 bg-clip-text text-transparent">{content.results.title}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-teal-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {content.results.cards.map((card, index) => (
              <div key={card.id} className={`bg-gradient-to-br from-black to-gray-900 rounded-xl p-8 text-center border ${
                index === 1 ? 'border-teal-400/20 hover:border-teal-400/40' : 'border-yellow-400/20 hover:border-yellow-400/40'
              } transition-all shadow-lg`}>
                <div className={`text-4xl md:text-5xl font-bold text-transparent ${
                  index === 1 ? 'bg-gradient-to-r from-teal-400 to-teal-300' : 'bg-gradient-to-r from-yellow-400 to-yellow-300'
                } bg-clip-text mb-3`}>
                  {card.amount}
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-xs md:text-sm text-gray-400 text-center leading-relaxed">
              {content.results.disclaimer}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-8 px-4 text-center text-xs text-gray-500">
        <p className="mb-4">
          Bu site Facebook web sitesinin veya Facebook Inc.'in bir parçası değildir. Ayrıca, bu site Facebook tarafından hiçbir şekilde onaylanmamıştır.
          FACEBOOK, FACEBOOK, Inc.'in ticari markasıdır.
        </p>
        <p className="mb-4">
          SORUMLULUK REDDİ: Yukarıda belirtilen satış rakamları kişisel satış rakamlarımız ve bazı durumlarda önceki veya mevcut müşterilerin satış rakamlarıdır.
          Lütfen bu sonuçların tipik olmadığını anlayın. Bunları kopyalayacağınızı ima etmiyoruz.
          Herhangi bir "nasıl yapılır" bilgisi satın alan ortalama kişi çok az veya hiç sonuç almaz. Bu referansları sadece örnek amaçlı kullanıyoruz.
          Sonuçlarınız değişiklik gösterecek ve geçmişiniz, deneyiminiz ve çalışma etiğiniz dahil ancak bunlarla sınırlı olmamak üzere birçok faktöre bağlı olacaktır.
          Tüm işler, büyük ve tutarlı çaba ve eylemin yanı sıra risk de içerir.
        </p>
        <div className="flex justify-center gap-4 text-blue-400">
          <a href="#" className="hover:underline">Gizlilik Politikası</a>
          <a href="#" className="hover:underline">Şartlar ve Koşullar</a>
          <a href="#" className="hover:underline">Sorumluluk Reddi</a>
          <a href="/admin/login" className="hover:underline opacity-30 hover:opacity-100 transition-opacity">⚙️</a>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
            >
              ×
            </button>
            <div className="p-6">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/84Is6fx7guuS4EeNPxf2"
                style={{width: '100%', height: '500px', border: 'none', borderRadius: '3px'}}
                id="inline-84Is6fx7guuS4EeNPxf2"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="WEBINAR - Copy"
                data-height="387"
                data-layout-iframe-id="inline-84Is6fx7guuS4EeNPxf2"
                data-form-id="84Is6fx7guuS4EeNPxf2"
                title="WEBINAR - Copy"
              />
            </div>
          </div>
        </div>
      )}

      {/* GoHighLevel Form Script */}
      {showModal && (
        <Script
          src="https://link.msgsndr.com/js/form_embed.js"
          strategy="afterInteractive"
        />
      )}
    </main>
  );
}
