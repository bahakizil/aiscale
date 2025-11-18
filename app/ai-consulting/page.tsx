import { FAQSection } from "@/components/layout/sections/faq";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero2";
import { ServicesSection } from "@/components/layout/sections/services";
import { TestimonialsSection } from "@/components/layout/sections/testimonials";
import { TypeformSection } from "@/components/layout/sections/typeform";
import { CaseStudiesSection } from "@/components/layout/sections/case-studies-simple";
import { LogoCarousel } from "@/components/layout/sections/logo-carousel2";
import { SolutionsSection } from "@/components/layout/sections/solutions";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { StickyCTA } from "@/components/layout/sticky-cta";
import { StructuredData } from "@/components/layout/structured-data";
import PreventBackNavigation from "@/components/PreventBackNavigation";

export const metadata = {
  title: "AI Consulting - Enterprise AI Solutions",
  description: "Professional AI consulting, audit, and training services for forward-thinking organizations. Strategic implementation guidance and comprehensive assessments.",
  openGraph: {
    type: "website",
    url: "https://aiconsulting.com",
    title: "AI Consulting - Enterprise AI Solutions",
    description: "Professional AI consulting, audit, and training services for forward-thinking organizations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Consulting - Enterprise AI Solutions",
    description: "Professional AI consulting, audit, and training services for forward-thinking organizations.",
  },
};

export default function Home() {
  return (
    <>
      <PreventBackNavigation />
      <StructuredData />
      <ScrollProgress />
      <StickyCTA />
      <BackToTop />
      <HeroSection />
      <TypeformSection />
      <SolutionsSection />
      <LogoCarousel />
      <ServicesSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
