"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, Users } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import Link from "next/link";

interface CaseStudy {
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    icon: typeof TrendingUp;
  }[];
  tags: string[];
}

const caseStudies: CaseStudy[] = [
  {
    title: "AI-Powered Customer Service Transformation",
    company: "TechCorp Inc",
    industry: "Technology",
    challenge: "High support ticket volume causing delays and customer dissatisfaction",
    solution: "Implemented intelligent chatbot with NLP capabilities and automated ticket routing",
    results: [
      { metric: "Response Time", value: "-75%", icon: Clock },
      { metric: "Customer Satisfaction", value: "+45%", icon: Users },
      { metric: "Cost Reduction", value: "-60%", icon: TrendingUp },
    ],
    tags: ["NLP", "Automation", "Customer Service"],
  },
  {
    title: "Predictive Analytics for Supply Chain",
    company: "LogisticsPro",
    industry: "Logistics",
    challenge: "Inefficient inventory management leading to stockouts and overstocking",
    solution: "Deployed ML models for demand forecasting and automated inventory optimization",
    results: [
      { metric: "Inventory Costs", value: "-40%", icon: TrendingUp },
      { metric: "Stockout Events", value: "-85%", icon: Clock },
      { metric: "Forecast Accuracy", value: "+92%", icon: Users },
    ],
    tags: ["Machine Learning", "Forecasting", "Optimization"],
  },
  {
    title: "Intelligent Document Processing",
    company: "FinanceHub",
    industry: "Finance",
    challenge: "Manual document processing taking weeks and prone to errors",
    solution: "Implemented OCR and AI-powered document classification and extraction system",
    results: [
      { metric: "Processing Time", value: "-90%", icon: Clock },
      { metric: "Accuracy", value: "+98%", icon: TrendingUp },
      { metric: "Team Efficiency", value: "+300%", icon: Users },
    ],
    tags: ["OCR", "Document AI", "Automation"],
  },
];

const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="bg-background/40 backdrop-blur-md border-muted-foreground/20 h-full hover:bg-background/60 hover:border-muted-foreground/40 transition-all duration-300 shadow-lg group">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Badge variant="outline" className="mb-3 border-muted-foreground/30">
                {study.industry}
              </Badge>
              <h3 className="text-xl font-bold mb-2 group-hover:text-foreground/80 transition-colors">
                {study.title}
              </h3>
              <p className="text-sm text-muted-foreground font-semibold">
                {study.company}
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Challenge
              </p>
              <p className="text-sm text-muted-foreground/90">{study.challenge}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Solution
              </p>
              <p className="text-sm text-muted-foreground/90">{study.solution}</p>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {study.results.map((result, idx) => {
              const Icon = result.icon;
              return (
                <div
                  key={idx}
                  className="bg-background/60 backdrop-blur-sm border border-muted-foreground/20 rounded-lg p-3 text-center"
                >
                  <Icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-lg font-bold">{result.value}</div>
                  <div className="text-xs text-muted-foreground">{result.metric}</div>
                </div>
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {study.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-background/60 backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <MagneticButton className="w-full">
            <Button
              variant="outline"
              className="w-full border-muted-foreground/20 hover:bg-background/60 group/btn"
              asChild
            >
              <Link href="#typeform" className="flex items-center justify-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </MagneticButton>
        </CardContent>
      </Card>
    </div>
  );
};

export const CaseStudiesSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="case-studies" className="container py-24 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={ref}
        className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-lg text-muted-foreground mb-2 tracking-wider">
          Case Studies
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Success Stories
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real results from real companies. See how we&apos;ve helped organizations transform with AI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={study.title} study={study} index={index} />
        ))}
      </div>
    </section>
  );
};
