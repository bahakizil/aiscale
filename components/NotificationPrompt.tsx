'use client';

import { useState, useEffect } from 'react';
import { NotificationManager } from '@/lib/push-notifications';
import { useLanguage } from '@/i18n/useLanguage';
import AccessibleButton from './AccessibleButton';

export default function NotificationPrompt() {
  const { t, locale } = useLanguage();
  const [showPrompt, setShowPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const manager = NotificationManager.getInstance();

    // Only show if notifications are supported and not already decided
    if (manager.isSupported() && manager.getPermission() === 'default') {
      // Show prompt after 5 seconds
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnable = async () => {
    setIsLoading(true);

    try {
      const manager = NotificationManager.getInstance();
      await manager.initialize();

      const granted = await manager.requestPermission();

      if (granted) {
        // Subscribe to push notifications
        await manager.subscribe();

        // Show welcome notification
        await manager.show({
          title: locale === 'tr' ? 'Bildirimler Etkinleştirildi! 🎉' : 'Notifications Enabled! 🎉',
          body: locale === 'tr'
            ? 'Artık önemli güncellemeler hakkında bildirim alacaksınız.'
            : 'You will now receive notifications about important updates.',
          tag: 'enable-notifications',
        });

        setShowPrompt(false);
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember user dismissed
    localStorage.setItem('notification-prompt-dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        {/* Icon */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {locale === 'tr' ? 'Bildirimleri Etkinleştir' : 'Enable Notifications'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {locale === 'tr'
                ? 'Yeni içerikler ve önemli güncellemeler hakkında haberdar olun.'
                : 'Stay updated about new content and important updates.'}
            </p>

            {/* Actions */}
            <div className="flex gap-2">
              <AccessibleButton
                onClick={handleEnable}
                variant="primary"
                size="sm"
                loading={isLoading}
                disabled={isLoading}
              >
                {locale === 'tr' ? 'Etkinleştir' : 'Enable'}
              </AccessibleButton>

              <AccessibleButton
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                disabled={isLoading}
              >
                {locale === 'tr' ? 'Daha Sonra' : 'Later'}
              </AccessibleButton>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label={locale === 'tr' ? 'Kapat' : 'Close'}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
