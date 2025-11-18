'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Settings {
  // Analytics
  googleAnalyticsId?: string;
  facebookPixelId?: string;

  // PWA
  vapidPublicKey?: string;
  vapidPrivateKey?: string;

  // SEO
  siteName?: string;
  siteUrl?: string;
  siteDescription?: string;
  siteKeywords?: string;

  // Features
  enablePushNotifications?: boolean;
  enableAnalytics?: boolean;
  enableMultiLanguage?: boolean;

  // Performance
  imageCacheTime?: number;
  enableImageOptimization?: boolean;

  // Stripe Payment
  stripeSecretKey?: string;
  stripePublishableKey?: string;
  stripePriceId?: string;
  stripeWebhookSecret?: string;

  // GoHighLevel
  goHighLevelApiKey?: string;

  // Social Media
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'general' | 'analytics' | 'pwa' | 'social' | 'advanced'>('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else if (response.status === 401) {
        router.push('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage('Ayarlar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage('✅ Ayarlar kaydedildi!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ Kaydetme hatası');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('❌ Kaydetme hatası');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Tüm ayarları varsayılana sıfırlamak istediğinize emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'DELETE',
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        setMessage('✅ Ayarlar sıfırlandı!');
      }
    } catch (error) {
      console.error('Error resetting settings:', error);
      setMessage('❌ Sıfırlama hatası');
    }
  };

  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header - Mobile Responsive */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Title Section */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => router.push('/admin/dashboard-v2')}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm sm:text-base"
              >
                ← Geri
              </button>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                ⚙️ Sistem Ayarları
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleReset}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Sıfırla
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Kaydediliyor...' : '💾 Kaydet'}
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="mt-3 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg text-sm">
              {message}
            </div>
          )}
        </div>
      </header>

      {/* Tabs - Mobile Responsive with Horizontal Scroll */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <nav className="flex -mb-px min-w-max">
              {[
                { id: 'general', label: '🏠 Genel', shortLabel: 'Genel' },
                { id: 'analytics', label: '📊 Analytics', shortLabel: 'Analytics' },
                { id: 'pwa', label: '📱 PWA', shortLabel: 'PWA' },
                { id: 'social', label: '🌐 Sosyal', shortLabel: 'Sosyal' },
                { id: 'advanced', label: '⚡ Gelişmiş', shortLabel: 'Gelişmiş' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Genel Ayarlar
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Adı
                  </label>
                  <input
                    type="text"
                    value={settings.siteName || ''}
                    onChange={e => updateSetting('siteName', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="AI Acquisition Method"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site URL
                  </label>
                  <input
                    type="url"
                    value={settings.siteUrl || ''}
                    onChange={e => updateSetting('siteUrl', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://yourdomain.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Site Açıklaması
                  </label>
                  <textarea
                    value={settings.siteDescription || ''}
                    onChange={e => updateSetting('siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                    placeholder="Yapay zeka ile işletmenizi büyütün"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SEO Anahtar Kelimeler (virgülle ayırın)
                  </label>
                  <input
                    type="text"
                    value={settings.siteKeywords || ''}
                    onChange={e => updateSetting('siteKeywords', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ai, yapay zeka, danışmanlık"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableMultiLanguage || false}
                      onChange={e => updateSetting('enableMultiLanguage', e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Çoklu Dil Desteği Aktif
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Analytics Ayarları
                </h2>

                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enableAnalytics || false}
                      onChange={e => updateSetting('enableAnalytics', e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Analytics Sistemini Aktif Et
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Google Analytics ID (GA4)
                  </label>
                  <input
                    type="text"
                    value={settings.googleAnalyticsId || ''}
                    onChange={e => updateSetting('googleAnalyticsId', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="G-XXXXXXXXXX"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Google Analytics 4 Measurement ID'nizi girin
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settings.facebookPixelId || ''}
                    onChange={e => updateSetting('facebookPixelId', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="XXXXXXXXXXXXXXXXX"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Facebook Pixel ID'nizi girin
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GoHighLevel API Key (Opsiyonel)
                  </label>
                  <input
                    type="password"
                    value={settings.goHighLevelApiKey || ''}
                    onChange={e => updateSetting('goHighLevelApiKey', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="API Key"
                  />
                </div>
              </div>
            )}

            {/* PWA Tab */}
            {activeTab === 'pwa' && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  PWA & Push Notifications
                </h2>

                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enablePushNotifications || false}
                      onChange={e => updateSetting('enablePushNotifications', e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                      Push Notifications Aktif
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    VAPID Public Key (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={settings.vapidPublicKey || ''}
                    onChange={e => updateSetting('vapidPublicKey', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VAPID Public Key"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Push notification için VAPID public key
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    VAPID Private Key (Opsiyonel)
                  </label>
                  <input
                    type="password"
                    value={settings.vapidPrivateKey || ''}
                    onChange={e => updateSetting('vapidPrivateKey', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="VAPID Private Key"
                  />
                  <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    ⚠️ Bu key gizli tutulmalıdır
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2 text-sm sm:text-base">
                    💡 VAPID Key Nasıl Oluşturulur?
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 mb-2">
                    Terminal'de şu komutu çalıştırın:
                  </p>
                  <code className="block bg-gray-900 text-green-400 p-2 rounded text-xs overflow-x-auto">
                    npx web-push generate-vapid-keys
                  </code>
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Sosyal Medya Bağlantıları
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={settings.facebookUrl || ''}
                    onChange={e => updateSetting('facebookUrl', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://facebook.com/your-page"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Twitter/X URL
                  </label>
                  <input
                    type="url"
                    value={settings.twitterUrl || ''}
                    onChange={e => updateSetting('twitterUrl', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://twitter.com/your-handle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={settings.linkedinUrl || ''}
                    onChange={e => updateSetting('linkedinUrl', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/company/your-company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settings.instagramUrl || ''}
                    onChange={e => updateSetting('instagramUrl', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://instagram.com/your-account"
                  />
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Gelişmiş Ayarlar
                </h2>

                {/* Stripe Payment Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    💳 Stripe Payment Settings
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Stripe Secret Key
                    </label>
                    <input
                      type="password"
                      value={settings.stripeSecretKey || ''}
                      onChange={e => updateSetting('stripeSecretKey', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="sk_live_..."
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Stripe Dashboard'dan alın (stripe.com/dashboard)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Stripe Publishable Key
                    </label>
                    <input
                      type="text"
                      value={settings.stripePublishableKey || ''}
                      onChange={e => updateSetting('stripePublishableKey', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="pk_live_..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Stripe Price ID (Subscription)
                    </label>
                    <input
                      type="text"
                      value={settings.stripePriceId || ''}
                      onChange={e => updateSetting('stripePriceId', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="price_..."
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Ürün fiyat ID'si (Products → Pricing'den alın)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Stripe Webhook Secret (Opsiyonel)
                    </label>
                    <input
                      type="password"
                      value={settings.stripeWebhookSecret || ''}
                      onChange={e => updateSetting('stripeWebhookSecret', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="whsec_..."
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Webhook events için (isteğe bağlı)
                    </p>
                  </div>
                </div>

                {/* Performance Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    ⚡ Performance Settings
                  </h3>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.enableImageOptimization || false}
                        onChange={e => updateSetting('enableImageOptimization', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                        Görsel Optimizasyonu Aktif (AVIF, WebP)
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Görsel Cache Süresi (saniye)
                    </label>
                    <input
                      type="number"
                      value={settings.imageCacheTime || 31536000}
                      onChange={e => updateSetting('imageCacheTime', parseInt(e.target.value))}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Varsayılan: 31536000 (1 yıl)
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2 text-sm sm:text-base">
                    ⚠️ Dikkat
                  </h3>
                  <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
                    Bu ayarlar performansı etkiler. Değiştirmeden önce etkilerini anladığınızdan emin olun.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
