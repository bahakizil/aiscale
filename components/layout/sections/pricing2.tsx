"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";

interface PricingTier {
  name: string;
  description: string;
  price: string;
  priceDetail: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter Audit",
    description: "Perfect for companies exploring AI opportunities",
    price: "$5,000",
    priceDetail: "One-time engagement",
    features: [
      "2-week comprehensive assessment",
      "Current state analysis",
      "AI opportunity identification",
      "Technology stack review",
      "Detailed roadmap document",
      "1 month email support",
    ],
    cta: "Get Started",
  },
  {
    name: "Implementation",
    description: "Full AI solution deployment with ongoing support",
    price: "Custom",
    priceDetail: "Based on project scope",
    features: [
      "Complete audit included",
      "Custom AI solution development",
      "Integration with existing systems",
      "Team training & workshops",
      "3 months implementation support",
      "Quarterly strategy sessions",
      "Priority support access",
      "ROI tracking & optimization",
    ],
    popular: true,
    cta: "Schedule Consultation",
  },
  {
    name: "Enterprise",
    description: "Comprehensive partnership for large-scale AI transformation",
    price: "Custom",
    priceDetail: "Annual partnership",
    features: [
      "Everything in Implementation",
      "Dedicated AI strategy consultant",
      "Multi-project coordination",
      "Advanced custom development",
      "Continuous optimization",
      "Executive advisory board access",
      "24/7 priority support",
      "Annual roadmap planning",
      "Technology trend briefings",
    ],
    cta: "Contact Sales",
  },
];

const PricingCard = ({ tier, index }: { tier: PricingTier; index: number }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const cardClasses = `transition-all duration-700 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  } ${tier.popular ? "lg:scale-105" : ""}`;

  const innerCardClasses = `bg-background/40 backdrop-blur-md border-muted-foreground/20 h-full hover:bg-background/60 hover:border-muted-foreground/40 transition-all duration-300 shadow-lg relative ${
    tier.popular ? "border-foreground/40 shadow-2xl" : ""
  }`;

  const buttonClasses = `w-full ${
    tier.popular
      ? "bg-foreground hover:bg-foreground/90"
      : "bg-background/60 hover:bg-background/80 border border-muted-foreground/20"
  }`;

  return (
    <div
      ref={ref}
      className={cardClasses}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className={innerCardClasses}>
        {tier.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <Badge className="bg-foreground text-background px-4 py-1">
              <Sparkles className="w-3 h-3 mr-1 inline" />
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader className="text-center pb-8 pt-8">
          <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
          <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
          <div className="mb-2">
            <span className="text-4xl font-bold">{tier.price}</span>
          </div>
          <p className="text-xs text-muted-foreground">{tier.priceDetail}</p>
        </CardHeader>

        <CardContent className="pt-0">
          <ul className="space-y-3 mb-8">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <MagneticButton className="w-full">
            <Button
              asChild
              className={buttonClasses}
              variant={tier.popular ? "default" : "outline"}
            >
              <Link href="#typeform">{tier.cta}</Link>
            </Button>
          </MagneticButton>
        </CardContent>
      </Card>
    </div>
  );
};

export const PricingSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const headerClasses = `text-center mb-12 transition-all duration-700 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`;

  const footerClasses = `text-center mt-12 transition-all duration-700 delay-500 ${
    isVisible ? "opacity-100" : "opacity-0"
  }`;

  return (
    <section id="pricing" className="container py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>
      </div>

      <div ref={ref} className={headerClasses}>
        <h2 className="text-lg text-muted-foreground mb-2 tracking-wider">Pricing</h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Transparent Pricing for Every Scale
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the engagement model that fits your needs. All packages include our commitment to your success.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <PricingCard key={tier.name} tier={tier} index={index} />
        ))}
      </div>

      <div className={footerClasses}>
        <p className="text-sm text-muted-foreground">
          All prices in USD. Custom enterprise solutions available.{" "}
          <Link href="#typeform" className="underline hover:text-foreground transition-colors">
            Contact us for details
          </Link>
        </p>
      </div>
    </section>
  );
};
