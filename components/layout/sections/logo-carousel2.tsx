"use client";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const logos = [
  { name: "TechCorp", width: 120 },
  { name: "DataFlow", width: 140 },
  { name: "FinTech", width: 130 },
  { name: "CloudSys", width: 135 },
  { name: "AI Labs", width: 125 },
  { name: "Innovate", width: 145 },
];

export const LogoCarousel = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="w-full bg-background pt-8 pb-16 sm:pb-20 overflow-hidden">
      <div className="container">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-8">
              Trusted by Industry Leaders
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex animate-scroll-infinite">
              {logos.map((logo, index) => (
                <div
                  key={`logo-1-${index}`}
                  className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
                  style={{ width: `${logo.width}px` }}
                >
                  <div className="bg-background/40 backdrop-blur-md border border-muted-foreground/20 rounded-lg p-6 h-20 flex items-center justify-center font-bold text-lg">
                    {logo.name}
                  </div>
                </div>
              ))}
              {logos.map((logo, index) => (
                <div
                  key={`logo-2-${index}`}
                  className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
                  style={{ width: `${logo.width}px` }}
                >
                  <div className="bg-background/40 backdrop-blur-md border border-muted-foreground/20 rounded-lg p-6 h-20 flex items-center justify-center font-bold text-lg">
                    {logo.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
