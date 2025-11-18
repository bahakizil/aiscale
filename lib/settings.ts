// Settings Management (File-based, no database)
import { promises as fs } from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'data', 'settings.json');

export interface SiteSettings {
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

  // Admin
  adminEmail?: string;
  adminPassword?: string;

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

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'AI Acquisition Method',
  siteUrl: 'https://yourdomain.com',
  siteDescription: 'Yapay zeka ile işletmenizi büyütün',
  siteKeywords: 'ai, yapay zeka, danışmanlık, eğitim, growth hacking',
  enablePushNotifications: true,
  enableAnalytics: true,
  enableMultiLanguage: true,
  imageCacheTime: 31536000,
  enableImageOptimization: true,
};

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Get all settings
export async function getSettings(): Promise<SiteSettings> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8');
    return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
  } catch (error) {
    // File doesn't exist, return defaults
    return DEFAULT_SETTINGS;
  }
}

// Get single setting
export async function getSetting<K extends keyof SiteSettings>(
  key: K
): Promise<SiteSettings[K]> {
  const settings = await getSettings();
  return settings[key];
}

// Update settings
export async function updateSettings(
  newSettings: Partial<SiteSettings>
): Promise<SiteSettings> {
  await ensureDataDir();

  const currentSettings = await getSettings();
  const updatedSettings = { ...currentSettings, ...newSettings };

  await fs.writeFile(
    SETTINGS_FILE,
    JSON.stringify(updatedSettings, null, 2),
    'utf-8'
  );

  return updatedSettings;
}

// Delete setting
export async function deleteSetting(key: keyof SiteSettings): Promise<void> {
  const settings = await getSettings();
  delete settings[key];

  await fs.writeFile(
    SETTINGS_FILE,
    JSON.stringify(settings, null, 2),
    'utf-8'
  );
}

// Reset to defaults
export async function resetSettings(): Promise<SiteSettings> {
  await ensureDataDir();

  await fs.writeFile(
    SETTINGS_FILE,
    JSON.stringify(DEFAULT_SETTINGS, null, 2),
    'utf-8'
  );

  return DEFAULT_SETTINGS;
}

// Get public settings (safe to expose to client)
export async function getPublicSettings() {
  const settings = await getSettings();

  return {
    siteName: settings.siteName,
    siteUrl: settings.siteUrl,
    siteDescription: settings.siteDescription,
    enablePushNotifications: settings.enablePushNotifications,
    enableAnalytics: settings.enableAnalytics,
    enableMultiLanguage: settings.enableMultiLanguage,
    googleAnalyticsId: settings.googleAnalyticsId,
    facebookPixelId: settings.facebookPixelId,
    vapidPublicKey: settings.vapidPublicKey,
    facebookUrl: settings.facebookUrl,
    twitterUrl: settings.twitterUrl,
    linkedinUrl: settings.linkedinUrl,
    instagramUrl: settings.instagramUrl,
  };
}
