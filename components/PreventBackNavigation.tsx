'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/**
 * Component to prevent users from navigating back to the homepage portal (/)
 * Users CAN navigate between the 3 websites freely
 * Users CANNOT navigate back to the root portal page
 */
export default function PreventBackNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handlePopState = () => {
      // Check if we're trying to go back to the root portal page
      // If so, prevent it and stay on current page
      const currentPath = window.location.pathname;

      // Allow navigation between websites, but block navigation to root
      if (currentPath === '/') {
        // If somehow we end up on root, redirect to webfunnel
        window.history.pushState(null, '', pathname);
        router.replace(pathname);
      }
    };

    // Listen for popstate (back/forward button)
    window.addEventListener('popstate', handlePopState);

    // Replace the current history entry to remove reference to root
    // This prevents the back button from taking users to /
    const currentState = window.history.state;
    if (currentState?.url === '/' || document.referrer.endsWith('/')) {
      window.history.replaceState(
        { ...currentState, preventBack: true },
        '',
        pathname
      );
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname, router]);

  // This component doesn't render anything
  return null;
}
