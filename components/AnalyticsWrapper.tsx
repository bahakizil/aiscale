'use client';

import { useEffect, useState } from 'react';
import Analytics from './Analytics';

export default function AnalyticsWrapper() {
  const [settings, setSettings] = useState<{
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    enableAnalytics?: boolean;
  }>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fetch public settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setLoaded(true);
      })
      .catch(err => {
        console.error('Failed to load analytics settings:', err);
        setLoaded(true);
      });
  }, []);

  if (!loaded || !settings.enableAnalytics) {
    return null;
  }

  return (
    <Analytics
      googleAnalyticsId={settings.googleAnalyticsId}
      facebookPixelId={settings.facebookPixelId}
    />
  );
}
