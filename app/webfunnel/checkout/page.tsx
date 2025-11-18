'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    country: 'Türkiye'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to success page
    window.location.href = '/webfunnel/success';
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Event Confirmation Banner */}
      <div className="bg-black border border-yellow-500/30 text-white py-4 px-6 text-center">
        <p className="text-sm font-medium">
          Pazar, 18 Kasım 2025 saat 12:00 EST (19:00 Türkiye Saati) Canlı Etkinliğe Katılmanız Onaylandı.
        </p>
        <p className="text-sm mt-1">
          Devam Etmeden Önce Aşağıdaki Önemli Daveti Okuyun
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Özel Tek Seferlik Davet
          </h1>
          <p className="text-xl text-gray-300">
            AI İşinizi Hızlandırmak İçin ŞİMDİ Yükselt
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left Column - Video and Features */}
          <div className="space-y-8">
            {/* Video Player */}
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-white font-bold text-lg">AI ACQUISITION</p>
                  <p className="text-white text-sm">CANLI AI ETKİNLİĞİ</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              <div className="border-b border-gray-700 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  AI Arbitrage <span className="text-yellow-400">Hızlandırılmış Paket</span>
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex-shrink-0 mt-1 shadow-lg"></div>
                  <p className="text-gray-200 text-base leading-relaxed">
                    <span className="font-semibold text-white">Pazar İstihbaratı Raporu</span> - Şu anda AI çözümlerine aktif olarak yatırım yapan en yüksek fırsatlı 50 niş
                  </p>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex-shrink-0 mt-1 shadow-lg"></div>
                  <p className="text-gray-200 text-base leading-relaxed">
                    <span className="font-semibold text-white">Eksiksiz bütçe aralıkları, karar verici profilleri ve kanıtlanmış mesajlaşma çerçeveleri</span> <span className="text-yellow-400 font-semibold">ilk ücretli müşterinizi imzalamak için</span>
                  </p>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex-shrink-0 mt-1 shadow-lg"></div>
                  <p className="text-gray-200 text-base leading-relaxed">
                    <span className="font-semibold text-white">Canlı örnekler</span> - Bu nişlere aktif olarak satış yapan müşterilerin örnekleri, böylece onları modelleyebilirsiniz
                  </p>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex-shrink-0 mt-1 shadow-lg"></div>
                  <p className="text-gray-200 text-base leading-relaxed">
                    <span className="font-semibold text-white">AI Araç Seti</span> - İşinizi otomatikleştirmek, büyütmek ve sistemleştirmek için 2025'te şu anda satılan tüm en iyi AI araçlarının tam dökümü
                  </p>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex-shrink-0 mt-1 shadow-lg"></div>
                  <p className="text-gray-200 text-base leading-relaxed">
                    <span className="font-semibold text-white">Tüm zamanların en çok dönüşüm sağlayan pazarlama kampanyaları</span> - İşletmelere 8 haneli AI sistemleri satmak için kullandığımız tam şablonlar
                  </p>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex-shrink-0 mt-1 shadow-lg"></div>
                  <p className="text-gray-200 text-base leading-relaxed">
                    <span className="font-semibold text-white">7 günlük hızlı başlangıç sprint'i</span> - 9-5 işinizi yaparken veya mevcut AI işinizi ölçeklendirirken AI işinizi kurma
                  </p>
                </div>

                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex-shrink-0 mt-1 shadow-lg"></div>
                  <p className="text-gray-200 text-base leading-relaxed">
                    <span className="font-semibold text-white">AI danışmanlarımızdan biriyle 1-1 görüşme</span> - Hepsi en az 50 AI projesinde danışmanlık yaptı ve AI ile zenginlik inşa etmeye başlamanıza yardımcı olacak
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="text-center py-4">
              <button
                onClick={() => window.location.href = '/webfunnel/success'}
                className="text-gray-400 text-sm underline hover:text-gray-300"
              >
                Hayır teşekkürler, ilk ücretli müşteriyi edinmede AI Kısayolunu kaçıracağım.
              </button>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="bg-white rounded-lg shadow-xl p-8 sticky top-8">
            <div className="mb-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm mb-1">ANINDA ERİŞİM İÇİN</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-gray-400 line-through text-xl">SADECE $497.00</span>
                  <span className="text-4xl font-bold text-black">$27</span>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Hızlandırılmış Paket</span>
                  </div>
                  <div>
                    <span className="text-gray-700 font-semibold">$27.00</span>
                    <span className="text-gray-500 text-sm ml-1">Tek Seferlik</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    İletişim Bilgileri
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Ad"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Soyad"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="E-posta"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-900 text-sm">🇹🇷 +90</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Telefon"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Ödeme Bilgileri
                  </label>
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <input type="radio" checked readOnly className="w-4 h-4" />
                      <span className="text-gray-700 text-sm">Kart</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Kart numarası"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 mb-3"
                      required
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="AA/YY"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        value={formData.cvc}
                        onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Ülke
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-blue-500"
                  >
                    <option>Türkiye</option>
                    <option>Amerika Birleşik Devletleri</option>
                    <option>Birleşik Krallık</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-md transition-colors"
                >
                  Satın Almayı Tamamla
                </button>

                <div className="text-center mt-4">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Stripe tarafından desteklenen güvenli ödeme</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Tüm büyük kredi kartları kabul edilir
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
