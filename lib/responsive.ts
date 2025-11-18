// Responsive Utilities and Breakpoints

export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const breakpointValues = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Media query strings
export const mediaQueries = {
  xs: `(max-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,

  // Max width queries
  maxXs: `(max-width: ${breakpoints.xs})`,
  maxSm: `(max-width: ${breakpoints.sm})`,
  maxMd: `(max-width: ${breakpoints.md})`,
  maxLg: `(max-width: ${breakpoints.lg})`,
  maxXl: `(max-width: ${breakpoints.xl})`,

  // Between queries
  smToMd: `(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`,
  mdToLg: `(min-width: ${breakpoints.md}) and (max-width: ${breakpoints.lg})`,
  lgToXl: `(min-width: ${breakpoints.lg}) and (max-width: ${breakpoints.xl})`,

  // Device queries
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',

  // Orientation
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',

  // Features
  touch: '(hover: none) and (pointer: coarse)',
  mouse: '(hover: hover) and (pointer: fine)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  darkMode: '(prefers-color-scheme: dark)',
  lightMode: '(prefers-color-scheme: light)',
  highContrast: '(prefers-contrast: high)',
} as const;

// Get current breakpoint
export function getCurrentBreakpoint(): keyof typeof breakpointValues | null {
  if (typeof window === 'undefined') return null;

  const width = window.innerWidth;

  if (width < breakpointValues.xs) return 'xs';
  if (width < breakpointValues.sm) return 'sm';
  if (width < breakpointValues.md) return 'md';
  if (width < breakpointValues.lg) return 'lg';
  if (width < breakpointValues.xl) return 'xl';
  return '2xl';
}

// Check if viewport matches query
export function matchesMediaQuery(query: string): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
}

// Responsive class helpers
export const responsiveClasses = {
  // Container sizes
  container: 'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
  containerNarrow: 'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl',
  containerWide: 'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]',

  // Grid systems
  grid2: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
  grid3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
  grid4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6',

  // Flex layouts
  flexStack: 'flex flex-col space-y-4',
  flexRow: 'flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0',
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',

  // Typography
  heading1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold',
  heading2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold',
  heading3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold',
  heading4: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold',
  bodyLarge: 'text-base sm:text-lg md:text-xl',
  body: 'text-sm sm:text-base',

  // Spacing
  section: 'py-12 md:py-16 lg:py-24',
  sectionSm: 'py-8 md:py-12 lg:py-16',
  sectionLg: 'py-16 md:py-24 lg:py-32',

  // Buttons
  button: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
  buttonLg: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg',
  buttonSm: 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm',

  // Cards
  card: 'p-4 sm:p-6 md:p-8 rounded-lg',
  cardSm: 'p-3 sm:p-4 md:p-6 rounded-lg',

  // Images
  imageRound: 'rounded-lg md:rounded-xl lg:rounded-2xl',

  // Hide/Show utilities
  hideMobile: 'hidden md:block',
  hideTablet: 'block md:hidden lg:block',
  hideDesktop: 'block lg:hidden',
  showMobile: 'block md:hidden',
  showTablet: 'hidden md:block lg:hidden',
  showDesktop: 'hidden lg:block',
} as const;

// Viewport size detector
export function getViewportSize(): { width: number; height: number } {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

// Check if mobile device
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Get safe area insets (for notched devices)
export function getSafeAreaInsets() {
  if (typeof window === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 };

  const computedStyle = getComputedStyle(document.documentElement);

  return {
    top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0'),
    right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0'),
    bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0'),
  };
}

// Responsive value selector
export function getResponsiveValue<T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
  default: T;
}): T {
  if (typeof window === 'undefined') return values.default;

  const width = window.innerWidth;

  if (width >= breakpointValues['2xl'] && values['2xl']) return values['2xl'];
  if (width >= breakpointValues.xl && values.xl) return values.xl;
  if (width >= breakpointValues.lg && values.lg) return values.lg;
  if (width >= breakpointValues.md && values.md) return values.md;
  if (width >= breakpointValues.sm && values.sm) return values.sm;
  if (width >= breakpointValues.xs && values.xs) return values.xs;

  return values.default;
}
