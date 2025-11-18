// Conversion Tracking Utilities
// Bu fonksiyonlar Analytics sistemini kullanarak conversion tracking yapar

import { trackEvent } from '@/components/Analytics';

export interface ConversionData {
  value?: number;
  currency?: string;
  transactionId?: string;
  items?: Array<{
    id: string;
    name: string;
    category?: string;
    price?: number;
    quantity?: number;
  }>;
}

export interface FunnelStep {
  step: number;
  name: string;
  timestamp: number;
  url: string;
}

// Funnel tracking - kullanıcının yolculuğunu takip eder
export class FunnelTracker {
  private static STORAGE_KEY = 'funnel_journey';

  static trackStep(stepName: string, stepNumber: number) {
    const journey = this.getJourney();

    const step: FunnelStep = {
      step: stepNumber,
      name: stepName,
      timestamp: Date.now(),
      url: window.location.pathname,
    };

    journey.push(step);

    // Son 20 adımı sakla
    if (journey.length > 20) {
      journey.shift();
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(journey));

    // Analytics'e gönder
    trackEvent('funnel_step', {
      step_number: stepNumber,
      step_name: stepName,
      funnel_position: journey.length,
    });
  }

  static getJourney(): FunnelStep[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static getDropOffPoints(): { [key: string]: number } {
    const journey = this.getJourney();
    const dropOffs: { [key: string]: number } = {};

    for (let i = 0; i < journey.length - 1; i++) {
      const current = journey[i];
      const next = journey[i + 1];

      // Eğer bir sonraki adım beklenen adım değilse
      if (next.step !== current.step + 1) {
        const dropOffKey = `${current.name} -> ${next.name}`;
        dropOffs[dropOffKey] = (dropOffs[dropOffKey] || 0) + 1;
      }
    }

    return dropOffs;
  }

  static clearJourney() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

// Conversion Events
export const ConversionEvents = {
  // Landing page view
  viewLanding: () => {
    FunnelTracker.trackStep('Landing Page View', 1);
    trackEvent('page_view', { page_type: 'landing' });
  },

  // Form started
  formStarted: (formName: string) => {
    FunnelTracker.trackStep('Form Started', 2);
    trackEvent('form_start', { form_name: formName });
  },

  // Form completed
  formCompleted: (formName: string, leadData?: any) => {
    FunnelTracker.trackStep('Form Completed', 3);
    trackEvent('generate_lead', {
      form_name: formName,
      ...leadData
    });
  },

  // Checkout page view
  viewCheckout: () => {
    FunnelTracker.trackStep('Checkout View', 4);
    trackEvent('begin_checkout');
  },

  // Add payment info
  addPaymentInfo: () => {
    FunnelTracker.trackStep('Payment Info Added', 5);
    trackEvent('add_payment_info');
  },

  // Purchase completed
  purchase: (data: ConversionData) => {
    FunnelTracker.trackStep('Purchase Completed', 6);

    trackEvent('purchase', {
      transaction_id: data.transactionId,
      value: data.value,
      currency: data.currency || 'USD',
      items: data.items,
    });

    // Journey tamamlandı, temizle
    setTimeout(() => FunnelTracker.clearJourney(), 5000);
  },

  // Video watched
  videoWatched: (videoId: string, percentage: number) => {
    trackEvent('video_progress', {
      video_id: videoId,
      percent_watched: percentage,
    });
  },

  // Button clicked
  buttonClicked: (buttonName: string, location: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      location: location,
    });
  },

  // Download
  download: (fileName: string, fileType: string) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
    });
  },

  // Social share
  socialShare: (platform: string, url: string) => {
    trackEvent('share', {
      method: platform,
      content_type: 'page',
      item_id: url,
    });
  },

  // Email signup
  emailSignup: (source: string) => {
    trackEvent('sign_up', {
      method: 'email',
      source: source,
    });
  },

  // Custom event
  custom: (eventName: string, params?: any) => {
    trackEvent(eventName, params);
  },
};

// Conversion rate hesaplama
export function calculateConversionRate(
  conversions: number,
  visitors: number
): number {
  if (visitors === 0) return 0;
  return (conversions / visitors) * 100;
}

// Session tracking
export class SessionTracker {
  private static SESSION_KEY = 'user_session';
  private static SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

  static startSession() {
    const session = {
      id: this.generateSessionId(),
      startTime: Date.now(),
      lastActivity: Date.now(),
      pageViews: 0,
      events: [] as string[],
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

    trackEvent('session_start', { session_id: session.id });

    return session;
  }

  static updateActivity() {
    const session = this.getSession();
    if (session) {
      session.lastActivity = Date.now();
      session.pageViews++;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }
  }

  static getSession() {
    try {
      const stored = localStorage.getItem(this.SESSION_KEY);
      if (!stored) return null;

      const session = JSON.parse(stored);

      // Session expired?
      if (Date.now() - session.lastActivity > this.SESSION_DURATION) {
        this.endSession();
        return null;
      }

      return session;
    } catch {
      return null;
    }
  }

  static endSession() {
    const session = this.getSession();
    if (session) {
      const duration = Date.now() - session.startTime;

      trackEvent('session_end', {
        session_id: session.id,
        duration_seconds: Math.floor(duration / 1000),
        page_views: session.pageViews,
      });

      localStorage.removeItem(this.SESSION_KEY);
    }
  }

  private static generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Auto-track session
if (typeof window !== 'undefined') {
  // Start or resume session
  if (!SessionTracker.getSession()) {
    SessionTracker.startSession();
  }

  // Update activity on page interaction
  ['click', 'scroll', 'keypress'].forEach(event => {
    window.addEventListener(event, () => {
      SessionTracker.updateActivity();
    }, { passive: true, once: true });
  });

  // End session on page unload
  window.addEventListener('beforeunload', () => {
    SessionTracker.endSession();
  });
}
