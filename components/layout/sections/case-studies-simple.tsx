"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface CaseStudy {
  title: string;
  company: string;
  industry: string;
  description: string;
  result: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Customer Service AI",
    company: "TechCorp Inc",
    industry: "Technology",
    description: "Implemented intelligent chatbot reducing response time by 75% and increasing satisfaction by 45%.",
    result: "60% cost reduction",
  },
  {
    title: "Supply Chain Analytics",
    company: "LogisticsPro",
    industry: "Logistics",
    description: "ML-powered demand forecasting system eliminating 85% of stockouts and improving accuracy to 92%.",
    result: "40% cost savings",
  },
  {
    title: "Document Processing",
    company: "FinanceHub",
    industry: "Finance",
    description: "Automated document extraction reducing processing time by 90% with 98% accuracy.",
    result: "300% efficiency gain",
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
          <Badge variant="outline" className="mb-4 border-muted-foreground/30 text-xs">
            {study.industry}
          </Badge>

          <h3 className="text-xl font-bold mb-2 group-hover:text-foreground/80 transition-colors">
            {study.title}
          </h3>

          <p className="text-sm text-muted-foreground font-semibold mb-4">
            {study.company}
          </p>

          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            {study.description}
          </p>
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
          Success Stories
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Real Results from Real Companies
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          See how we&apos;ve helped organizations transform with AI
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={study.title} study={study} index={index} />
        ))}
      </div>
    </section>
  );
};
