'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { WebFunnelContent } from '@/lib/webfunnel-content';

export default function AdminDashboardV2() {
  const [content, setContent] = useState<WebFunnelContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'landing' | 'checkout' | 'success'>('landing');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [history, setHistory] = useState<WebFunnelContent[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    fetchContent();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (unsavedChanges) handleSave(false);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unsavedChanges]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSaveEnabled || !unsavedChanges || !content) return;

    const timer = setTimeout(() => {
      handleSave(true);
    }, 3000); // Auto-save after 3 seconds of inactivity

    return () => clearTimeout(timer);
  }, [content, autoSaveEnabled, unsavedChanges]);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      setContent(data);
      setHistory([data]);
      setHistoryIndex(0);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage({ type: 'error', text: 'Failed to load content' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (isAutoSave = false) => {
    if (!content) return;

    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!response.ok) throw new Error('Failed to save content');

      setUnsavedChanges(false);
      setMessage({
        type: 'success',
        text: isAutoSave ? '💾 Otomatik kaydedildi' : '✅ İçerik başarıyla kaydedildi!'
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage({ type: 'error', text: '❌ İçerik kaydedilemedi' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm('Tüm içeriği varsayılana sıfırlamak istediğinize emin misiniz?')) return;

    try {
      const response = await fetch('/api/admin/content', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to reset');

      await fetchContent();
      setMessage({ type: 'success', text: 'İçerik sıfırlandı' });
    } catch (error) {
      console.error('Error resetting content:', error);
      setMessage({ type: 'error', text: 'İçerik sıfırlanamadı' });
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const updateContent = useCallback((newContent: WebFunnelContent) => {
    setContent(newContent);
    setUnsavedChanges(true);

    // Add to history for undo/redo
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    if (newHistory.length > 50) newHistory.shift(); // Keep last 50 changes
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(history[historyIndex - 1]);
      setUnsavedChanges(true);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(history[historyIndex + 1]);
      setUnsavedChanges(true);
    }
  };

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <div className="text-white text-xl">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Enhanced Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text">
                Admin Panel
              </h1>
              {unsavedChanges && (
                <span className="text-xs px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                  ● Kaydedilmemiş değişiklikler
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Undo/Redo */}
              <div className="flex gap-1 mr-2">
                <button
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="p-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
                  title="Geri Al (Ctrl+Z)"
                >
                  ↶
                </button>
                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
                  title="İleri Al (Ctrl+Y)"
                >
                  ↷
                </button>
              </div>

              {/* Auto-save toggle */}
              <label className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
                <input
                  type="checkbox"
                  checked={autoSaveEnabled}
                  onChange={(e) => setAutoSaveEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-300">Otomatik Kaydet</span>
              </label>

              {/* Preview toggle */}
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
              >
                {showPreview ? '📝 Düzenle' : '👁️ Önizleme'}
              </button>

              <button
                onClick={() => router.push('/admin/media')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors"
              >
                📁 Medya
              </button>

              <button
                onClick={() => router.push('/admin/settings')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
              >
                ⚙️ Ayarlar
              </button>

              <button
                onClick={() => window.open('/webfunnel', '_blank')}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
              >
                🚀 Canlı Görünüm
              </button>

              <button
                onClick={handleReset}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors"
              >
                🔄 Sıfırla
              </button>

              <button
                onClick={() => handleSave(false)}
                disabled={saving || !unsavedChanges}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors font-semibold"
              >
                {saving ? '💾 Kaydediliyor...' : '💾 Kaydet'}
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
              >
                🚪 Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Message Banner */}
      {message && (
        <div className={`${
          message.type === 'success'
            ? 'bg-green-500/10 border-green-500/50 text-green-400'
            : 'bg-red-500/10 border-red-500/50 text-red-400'
        } border-b px-4 py-3 text-center text-sm font-medium`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full'} overflow-auto`}>
          {/* Tabs */}
          <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex gap-2">
                {[
                  { id: 'landing', label: '📄 Landing Page', icon: '🏠' },
                  { id: 'checkout', label: '💳 Checkout Page', icon: '💰' },
                  { id: 'success', label: '✅ Success Page', icon: '🎉' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all ${
                      activeTab === tab.id
                        ? 'border-teal-500 text-teal-400 bg-gray-700/50'
                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Editor */}
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {activeTab === 'landing' && (
              <CompactLandingEditor content={content} updateContent={updateContent} />
            )}
            {activeTab === 'checkout' && (
              <CompactCheckoutEditor content={content} updateContent={updateContent} />
            )}
            {activeTab === 'success' && (
              <CompactSuccessEditor content={content} updateContent={updateContent} />
            )}
          </main>
        </div>

        {/* Preview Pane */}
        {showPreview && (
          <div className="w-1/2 border-l border-gray-700 bg-gray-950">
            <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700">
              <h3 className="text-white font-semibold">📱 Canlı Önizleme</h3>
              <p className="text-xs text-gray-400 mt-1">Değişiklikler gerçek zamanlı görünür</p>
            </div>
            <div className="h-full overflow-auto">
              <iframe
                src={`/webfunnel?preview=true&t=${Date.now()}`}
                className="w-full h-full border-0"
                title="Preview"
              />
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-400">
          <div className="flex gap-6">
            <span><kbd className="px-2 py-1 bg-gray-700 rounded">Ctrl+Z</kbd> Geri Al</span>
            <span><kbd className="px-2 py-1 bg-gray-700 rounded">Ctrl+Y</kbd> İleri Al</span>
            <span><kbd className="px-2 py-1 bg-gray-700 rounded">Ctrl+S</kbd> Kaydet</span>
          </div>
          <span className="text-gray-500">v2.0 Enhanced</span>
        </div>
      </div>
    </div>
  );
}

// Compact Landing Editor
function CompactLandingEditor({ content, updateContent }: any) {
  const updateLanding = (updates: any) => {
    updateContent({
      ...content,
      landing: { ...content.landing, ...updates },
    });
  };

  return (
    <div className="space-y-6">
      <FormCard title="🎯 Header Banner" icon="📢">
        <input
          type="text"
          value={content.landing.headerBanner}
          onChange={(e) => updateLanding({ headerBanner: e.target.value })}
          className="input-field"
          placeholder="Header banner text..."
        />
      </FormCard>

      <FormCard title="📢 Ana Başlık" icon="💬">
        <div className="grid gap-3">
          {['line1', 'line2', 'line3', 'line4', 'amount'].map((key, i) => (
            <input
              key={key}
              type="text"
              value={content.landing.mainHeadline[key]}
              onChange={(e) => updateLanding({
                mainHeadline: { ...content.landing.mainHeadline, [key]: e.target.value }
              })}
              className="input-field"
              placeholder={key === 'amount' ? 'Miktar (örn: $18,105+)' : `Satır ${i + 1}`}
            />
          ))}
        </div>
      </FormCard>

      <FormCard title="⏰ Etkinlik & Geri Sayım" icon="📅">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={content.landing.eventDate}
            onChange={(e) => updateLanding({ eventDate: e.target.value })}
            className="input-field"
            placeholder="Etkinlik Tarihi"
          />
          <input
            type="text"
            value={content.landing.eventTime}
            onChange={(e) => updateLanding({ eventTime: e.target.value })}
            className="input-field"
            placeholder="Saat"
          />
          <input
            type="datetime-local"
            value={content.landing.countdownTarget.substring(0, 16)}
            onChange={(e) => updateLanding({ countdownTarget: new Date(e.target.value).toISOString() })}
            className="input-field col-span-2"
          />
        </div>
      </FormCard>

      <FormCard title="🖼️ Görsel Yönetimi" icon="📸">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-teal-500/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const imageUrl = event.target?.result as string;
                    updateLanding({ imageUrl });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer block"
            >
              <div className="text-4xl mb-2">📤</div>
              <p className="text-gray-300 font-medium mb-1">Görsel Yükle</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF formatları desteklenir</p>
            </label>
          </div>
          {content.landing.imageUrl && (
            <div className="relative">
              <img
                src={content.landing.imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => updateLanding({ imageUrl: '' })}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </FormCard>

      <FormCard title="⭐ Özellikler" icon="✨">
        <div className="space-y-3">
          {content.landing.features.map((feature: any, index: number) => (
            <div
              key={feature.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', index.toString());
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
              }}
              onDrop={(e) => {
                e.preventDefault();
                const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
                const dropIndex = index;

                if (dragIndex === dropIndex) return;

                const newFeatures = [...content.landing.features];
                const [draggedItem] = newFeatures.splice(dragIndex, 1);
                newFeatures.splice(dropIndex, 0, draggedItem);
                updateLanding({ features: newFeatures });
              }}
              className="flex gap-3 items-start p-3 bg-gray-700/30 rounded-lg border-2 border-transparent hover:border-teal-500/30 cursor-move transition-all"
            >
              <span className="text-gray-500 mt-3 min-w-[24px] cursor-grab active:cursor-grabbing">⋮⋮</span>
              <span className="text-teal-400 font-bold mt-3 min-w-[24px]">{index + 1}.</span>
              <textarea
                value={feature.text}
                onChange={(e) => {
                  const newFeatures = [...content.landing.features];
                  newFeatures[index] = { ...feature, text: e.target.value };
                  updateLanding({ features: newFeatures });
                }}
                rows={2}
                className="input-field flex-1"
              />
            </div>
          ))}
        </div>
      </FormCard>

      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: rgb(55, 65, 81);
          border: 1px solid rgb(75, 85, 99);
          border-radius: 0.5rem;
          color: white;
          font-size: 0.875rem;
          transition: all 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: rgb(20, 184, 166);
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
        }
      `}</style>
    </div>
  );
}

// Compact Checkout Editor
function CompactCheckoutEditor({ content, updateContent }: any) {
  const updateCheckout = (updates: any) => {
    updateContent({
      ...content,
      checkout: { ...content.checkout, ...updates },
    });
  };

  return (
    <div className="space-y-6">
      <FormCard title="✅ Onay Bannerı" icon="📢">
        <textarea
          value={content.checkout.confirmationBanner}
          onChange={(e) => updateCheckout({ confirmationBanner: e.target.value })}
          rows={2}
          className="input-field"
        />
      </FormCard>

      <FormCard title="💰 Fiyatlandırma" icon="💵">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            value={content.checkout.pricing.originalPrice}
            onChange={(e) => updateCheckout({
              pricing: { ...content.checkout.pricing, originalPrice: e.target.value }
            })}
            className="input-field"
            placeholder="Eski Fiyat"
          />
          <input
            type="text"
            value={content.checkout.pricing.currentPrice}
            onChange={(e) => updateCheckout({
              pricing: { ...content.checkout.pricing, currentPrice: e.target.value }
            })}
            className="input-field"
            placeholder="Yeni Fiyat"
          />
          <input
            type="text"
            value={content.checkout.pricing.currency}
            onChange={(e) => updateCheckout({
              pricing: { ...content.checkout.pricing, currency: e.target.value }
            })}
            className="input-field"
            placeholder="Para Birimi"
          />
        </div>
      </FormCard>

      <FormCard title="⭐ Paket Özellikleri" icon="📦">
        <div className="space-y-3">
          {content.checkout.features.map((feature: any, index: number) => (
            <div
              key={feature.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', index.toString());
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
              }}
              onDrop={(e) => {
                e.preventDefault();
                const dragIndex = parseInt(e.dataTransfer.getData('text/html'));
                const dropIndex = index;

                if (dragIndex === dropIndex) return;

                const newFeatures = [...content.checkout.features];
                const [draggedItem] = newFeatures.splice(dragIndex, 1);
                newFeatures.splice(dropIndex, 0, draggedItem);
                updateCheckout({ features: newFeatures });
              }}
              className="flex gap-3 items-start p-3 bg-gray-700/30 rounded-lg border-2 border-transparent hover:border-teal-500/30 cursor-move transition-all"
            >
              <span className="text-gray-500 mt-3 min-w-[24px] cursor-grab active:cursor-grabbing">⋮⋮</span>
              <select
                value={feature.color}
                onChange={(e) => {
                  const newFeatures = [...content.checkout.features];
                  newFeatures[index] = { ...feature, color: e.target.value };
                  updateCheckout({ features: newFeatures });
                }}
                className="input-field w-32"
              >
                <option value="red">🔴 Kırmızı</option>
                <option value="orange">🟠 Turuncu</option>
              </select>
              <textarea
                value={feature.text}
                onChange={(e) => {
                  const newFeatures = [...content.checkout.features];
                  newFeatures[index] = { ...feature, text: e.target.value };
                  updateCheckout({ features: newFeatures });
                }}
                rows={2}
                className="input-field flex-1"
              />
            </div>
          ))}
        </div>
      </FormCard>
    </div>
  );
}

// Compact Success Editor
function CompactSuccessEditor({ content, updateContent }: any) {
  const updateSuccess = (updates: any) => {
    updateContent({
      ...content,
      success: { ...content.success, ...updates },
    });
  };

  return (
    <div className="space-y-6">
      <FormCard title="✅ Başarı Sayfası" icon="🎉">
        <div className="space-y-4">
          <input
            type="text"
            value={content.success.title}
            onChange={(e) => updateSuccess({ title: e.target.value })}
            className="input-field"
            placeholder="Başlık"
          />
          <input
            type="text"
            value={content.success.subtitle}
            onChange={(e) => updateSuccess({ subtitle: e.target.value })}
            className="input-field"
            placeholder="Alt Başlık"
          />
          <input
            type="text"
            value={content.success.eventDate}
            onChange={(e) => updateSuccess({ eventDate: e.target.value })}
            className="input-field"
            placeholder="Etkinlik Tarihi"
          />
          <input
            type="datetime-local"
            value={content.success.countdownTarget.substring(0, 16)}
            onChange={(e) => updateSuccess({ countdownTarget: new Date(e.target.value).toISOString() })}
            className="input-field"
          />
        </div>
      </FormCard>
    </div>
  );
}

// Reusable Form Card Component
function FormCard({ title, icon, children }: { title: string; icon?: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg hover:border-gray-600 transition-colors">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
}
