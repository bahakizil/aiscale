"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Sarah",
    role: "CTO",
    company: "TechCorp Inc",
    content: "Their AI consulting transformed our operations. We saw a 40% increase in efficiency within three months. The team's expertise and professionalism exceeded our expectations.",
    rating: 5,
  },
  {
    name: "Michael",
    role: "VP of Engineering",
    company: "DataFlow Systems",
    content: "The audit revealed opportunities we hadn't considered. Their strategic approach and technical depth helped us implement AI solutions that directly impacted our bottom line.",
    rating: 5,
  },
  {
    name: "Emily",
    role: "Head of Innovation",
    company: "FinTech Solutions",
    content: "Outstanding training program. Our team now confidently implements AI solutions. The hands-on approach and real-world examples made all the difference.",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: TestimonialProps; index: number }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="bg-background/40 backdrop-blur-md border-muted-foreground/20 h-full hover:bg-background/60 hover:border-muted-foreground/40 transition-all duration-300 shadow-lg relative overflow-hidden group">
        <div className="absolute top-4 right-4 text-muted-foreground/10 group-hover:text-muted-foreground/20 transition-colors">
          <Quote className="w-16 h-16" />
        </div>
        <CardContent className="p-6 relative">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-foreground text-foreground"
              />
            ))}
          </div>
          <p className="text-muted-foreground/90 mb-6 leading-relaxed">
            &ldquo;{testimonial.content}&rdquo;
          </p>
          <div className="border-t border-muted-foreground/20 pt-4">
            <p className="font-semibold text-foreground">{testimonial.name}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="testimonials" className="container py-24 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={ref}
        className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-lg text-muted-foreground mb-2 tracking-wider">
          Testimonials
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Trusted by Industry Leaders
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          See what our clients say about their transformation journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-[90%] mx-auto">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};
