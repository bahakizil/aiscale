// Accessibility Utilities
// WCAG 2.1 AA uyumlu erişilebilirlik yardımcı fonksiyonları

export interface AriaLiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive' | 'off';
}

// Skip to main content link için
export function createSkipLink(targetId: string = 'main-content') {
  return {
    href: `#${targetId}`,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md',
    children: 'Ana içeriğe git'
  };
}

// Keyboard navigation helpers
export const KeyboardKeys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
} as const;

export function handleKeyboardClick(
  event: React.KeyboardEvent,
  callback: () => void
) {
  if (event.key === KeyboardKeys.ENTER || event.key === KeyboardKeys.SPACE) {
    event.preventDefault();
    callback();
  }
}

// Focus management
export class FocusManager {
  private static previousFocus: HTMLElement | null = null;

  static saveFocus() {
    this.previousFocus = document.activeElement as HTMLElement;
  }

  static restoreFocus() {
    if (this.previousFocus && this.previousFocus.focus) {
      this.previousFocus.focus();
    }
  }

  static trapFocus(element: HTMLElement) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== KeyboardKeys.TAB) return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }

  static getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll(selector));
  }
}

// Color contrast checker
export function meetsContrastRequirements(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  // Simplified contrast check - gerçek uygulamada color-contrast library kullanın
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);

  if (!fg || !bg) return false;

  const l1 = getLuminance(fg.r, fg.g, fg.b);
  const l2 = getLuminance(bg.r, bg.g, bg.b);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return level === 'AAA' ? ratio >= 7 : ratio >= 4.5;
}

// Screen reader announcements
export function announceToScreenReader(
  message: string,
  politeness: 'polite' | 'assertive' = 'polite'
) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', politeness);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// ARIA labels helper
export const ariaLabels = {
  // Navigation
  navigation: (locale: 'tr' | 'en' = 'tr') => ({
    'aria-label': locale === 'tr' ? 'Ana navigasyon' : 'Main navigation'
  }),

  // Buttons
  closeButton: (locale: 'tr' | 'en' = 'tr') => ({
    'aria-label': locale === 'tr' ? 'Kapat' : 'Close'
  }),

  menuButton: (locale: 'tr' | 'en' = 'tr') => ({
    'aria-label': locale === 'tr' ? 'Menüyü aç' : 'Open menu',
    'aria-expanded': 'false',
    'aria-haspopup': 'true'
  }),

  searchButton: (locale: 'tr' | 'en' = 'tr') => ({
    'aria-label': locale === 'tr' ? 'Ara' : 'Search'
  }),

  // Forms
  requiredField: (fieldName: string, locale: 'tr' | 'en' = 'tr') => ({
    'aria-label': locale === 'tr' ? `${fieldName} (gerekli)` : `${fieldName} (required)`,
    'aria-required': 'true'
  }),

  formError: (fieldName: string) => ({
    role: 'alert',
    'aria-live': 'assertive',
    id: `${fieldName}-error`
  }),

  // Loading states
  loading: (locale: 'tr' | 'en' = 'tr') => ({
    role: 'status',
    'aria-live': 'polite',
    'aria-label': locale === 'tr' ? 'Yükleniyor' : 'Loading'
  }),

  // Modals
  modal: (title: string) => ({
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': `${title}-title`
  }),

  // Landmarks
  mainContent: () => ({
    role: 'main',
    id: 'main-content'
  }),

  complementary: (locale: 'tr' | 'en' = 'tr') => ({
    role: 'complementary',
    'aria-label': locale === 'tr' ? 'Yan içerik' : 'Sidebar content'
  }),
};

// Reduced motion detection
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// High contrast mode detection
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

// Accessible error message
export function createAccessibleError(
  fieldId: string,
  errorMessage: string
): { id: string; role: string; 'aria-live': string } {
  return {
    id: `${fieldId}-error`,
    role: 'alert',
    'aria-live': 'assertive',
  };
}

// Tooltip accessibility
export function tooltipProps(tooltipId: string) {
  return {
    trigger: {
      'aria-describedby': tooltipId,
    },
    tooltip: {
      id: tooltipId,
      role: 'tooltip',
    },
  };
}
