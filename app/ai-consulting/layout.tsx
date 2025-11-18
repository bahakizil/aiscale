import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "AI Consulting - Enterprise AI Solutions",
  description: "Professional AI consulting, audit, and training services for forward-thinking organizations. Transform your business with AI excellence.",
};

export default function AIConsultingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn(
      "ai-consulting-site dark min-h-screen bg-background antialiased",
      inter.variable,
      outfit.variable
    )}>
      <Navbar />
      {children}
    </div>
  );
}
