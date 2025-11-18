'use client';

import { useLanguage } from '@/i18n/useLanguage';
import { locales, localeNames, localeFlags, Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const { locale, setLocale, isClient } = useLanguage();

  if (!isClient) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
        <span className="text-sm">🌐</span>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
        <span className="text-sm">{localeFlags[locale]}</span>
        <span className="text-sm font-medium hidden sm:inline">{localeNames[locale]}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => setLocale(loc)}
            className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              locale === loc ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <span className="text-lg">{localeFlags[loc]}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{localeNames[loc]}</span>
            {locale === loc && (
              <svg className="w-4 h-4 ml-auto text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
