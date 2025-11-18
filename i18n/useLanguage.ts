'use client';

import { useState, useEffect } from 'react';
import { Locale, defaultLocale } from './config';
import trMessages from '@/messages/tr.json';
import enMessages from '@/messages/en.json';

const messages = {
  tr: trMessages,
  en: enMessages,
};

const LOCALE_STORAGE_KEY = 'preferred-locale';

export function useLanguage() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load from localStorage
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (stored && (stored === 'tr' || stored === 'en')) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (isClient) {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = messages[locale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return {
    locale,
    setLocale,
    t,
    isClient,
  };
}
