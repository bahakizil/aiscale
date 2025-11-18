import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Acquisition Method | Yapay Zeka ile İşinizi Büyütün",
  description: "Yapay zeka ile işletmenizi büyütün. AI danışmanlık, eğitim ve growth hacking hizmetleri. Modern dünyada para kazandıran becerileri öğrenin.",
  keywords: ["ai", "yapay zeka", "danışmanlık", "eğitim", "growth hacking", "dijital pazarlama", "webinar", "online eğitim"],
  authors: [{ name: "AI Acquisition Method" }],
  openGraph: {
    title: "AI Acquisition Method",
    description: "Yapay zeka ile işletmenizi büyütün",
    type: "website",
    locale: "tr_TR",
    siteName: "AI Acquisition Method",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Acquisition Method",
    description: "Yapay zeka ile işletmenizi büyütün",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AnalyticsWrapper />
        {children}
      </body>
    </html>
  );
}
