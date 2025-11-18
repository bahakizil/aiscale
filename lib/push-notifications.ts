// Push Notification Utilities
// Browser-based push notifications using Service Worker API

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  data?: any;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

// Check if notifications are supported
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
}

// Check current permission status
export function getNotificationPermission(): NotificationPermission {
  if (!isNotificationSupported()) {
    return 'denied';
  }
  return Notification.permission;
}

// Request notification permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) {
    console.warn('Notifications are not supported in this browser');
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return 'denied';
  }
}

// Register service worker
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers are not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    });

    console.log('Service Worker registered successfully:', registration);

    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
}

// Show local notification
export async function showNotification(options: NotificationOptions): Promise<void> {
  const permission = await requestNotificationPermission();

  if (permission !== 'granted') {
    console.warn('Notification permission not granted');
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  await registration.showNotification(options.title, {
    body: options.body,
    icon: options.icon || '/icon-192.png',
    badge: options.badge || '/icon-192.png',
    image: options.image,
    tag: options.tag || 'default',
    requireInteraction: options.requireInteraction || false,
    silent: options.silent || false,
    data: options.data,
    actions: options.actions,
    vibrate: [200, 100, 200],
  });
}

// Subscribe to push notifications (requires VAPID keys)
export async function subscribeToPushNotifications(
  vapidPublicKey?: string
): Promise<PushSubscription | null> {
  try {
    const registration = await navigator.serviceWorker.ready;

    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      return subscription;
    }

    // Subscribe to push
    if (vapidPublicKey) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });
    } else {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
      });
    }

    console.log('Push subscription successful:', subscription);

    // Send subscription to your server
    await sendSubscriptionToServer(subscription);

    return subscription;
  } catch (error) {
    console.error('Failed to subscribe to push notifications:', error);
    return null;
  }
}

// Unsubscribe from push notifications
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      console.log('Unsubscribed from push notifications');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Failed to unsubscribe from push notifications:', error);
    return false;
  }
}

// Helper: Convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Send subscription to server
async function sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
  try {
    // TODO: Replace with your actual API endpoint
    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });
  } catch (error) {
    console.error('Failed to send subscription to server:', error);
  }
}

// Notification Manager Class
export class NotificationManager {
  private static instance: NotificationManager;
  private registration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  async initialize(): Promise<boolean> {
    if (!isNotificationSupported()) {
      return false;
    }

    this.registration = await registerServiceWorker();
    return this.registration !== null;
  }

  async requestPermission(): Promise<boolean> {
    const permission = await requestNotificationPermission();
    return permission === 'granted';
  }

  async show(options: NotificationOptions): Promise<void> {
    await showNotification(options);
  }

  async subscribe(vapidPublicKey?: string): Promise<PushSubscription | null> {
    return subscribeToPushNotifications(vapidPublicKey);
  }

  async unsubscribe(): Promise<boolean> {
    return unsubscribeFromPushNotifications();
  }

  getPermission(): NotificationPermission {
    return getNotificationPermission();
  }

  isSupported(): boolean {
    return isNotificationSupported();
  }
}

// Predefined notification templates
export const NotificationTemplates = {
  welcome: (): NotificationOptions => ({
    title: 'Hoş Geldiniz! 👋',
    body: 'AI Acquisition Method\'a katıldığınız için teşekkürler!',
    icon: '/icon-192.png',
    tag: 'welcome',
  }),

  newContent: (contentTitle: string): NotificationOptions => ({
    title: 'Yeni İçerik! 🎉',
    body: `${contentTitle} yayınlandı!`,
    icon: '/icon-192.png',
    tag: 'new-content',
    requireInteraction: true,
  }),

  reminder: (message: string): NotificationOptions => ({
    title: 'Hatırlatma 🔔',
    body: message,
    icon: '/icon-192.png',
    tag: 'reminder',
    requireInteraction: true,
  }),

  update: (message: string): NotificationOptions => ({
    title: 'Güncelleme 📢',
    body: message,
    icon: '/icon-192.png',
    tag: 'update',
  }),
};
