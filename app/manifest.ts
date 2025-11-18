import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI Acquisition Method',
    short_name: 'AI Method',
    description: 'Yapay zeka ile işletmenizi büyütün. AI danışmanlık, eğitim ve growth hacking.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['business', 'education', 'productivity'],
    lang: 'tr',
    dir: 'ltr',
  };
}
