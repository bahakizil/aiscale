"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileSearch, Users, GraduationCap } from "lucide-react";
import TiltCard from "@/components/animata/card/tilt-card";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}
const serviceList: ServiceProps[] = [
  {
    title: "Consulting",
    description:
      "Strategic AI implementation guidance tailored to your business objectives and operational requirements.",
    icon: <FileSearch className="w-10 h-10" />,
  },
  {
    title: "Audit",
    description:
      "Comprehensive assessment of your AI readiness, identifying opportunities and creating actionable roadmaps.",
    icon: <Users className="w-10 h-10" />,
  },
  {
    title: "Training",
    description:
      "Professional development programs to empower your team with AI capabilities and best practices.",
    icon: <GraduationCap className="w-10 h-10" />,
  },
];

export const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="services" className="container py-24 sm:py-32">
      <div
        ref={ref}
        className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-lg text-muted-foreground mb-2 tracking-wider">
          Services
        </h2>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Comprehensive AI Solutions
        </h2>
        <h3 className="md:w-1/2 mx-auto text-xl text-muted-foreground">
          Tailored services for enterprise organizations
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-[80%] mx-auto animate-fadeIn" style={{ animationDelay: "200ms" }}>
        {serviceList.map(({ title, description, icon }, index) => (
          <TiltCard key={title}>
            <Card
              className="bg-gradient-to-br from-background/40 via-purple-950/3 to-background/40 backdrop-blur-md border-purple-500/10 h-full hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 shadow-lg animate-fadeIn"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <CardHeader>
                <div className="mb-4 text-purple-400 transition-transform group-hover:scale-110">{icon}</div>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="text-muted-foreground/80">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};
