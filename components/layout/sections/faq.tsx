"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "What industries do you serve?",
    answer:
      "We work with enterprise organizations across technology, finance, healthcare, and manufacturing sectors, providing tailored AI solutions that meet industry-specific requirements and compliance standards.",
    value: "item-1",
  },
  {
    question: "What is included in the audit service?",
    answer:
      "Our comprehensive audit includes workflow analysis, AI opportunity assessment, technology stack evaluation, and a detailed implementation roadmap with prioritized recommendations.",
    value: "item-2",
  },
  {
    question: "How long does a typical engagement last?",
    answer:
      "Engagement duration varies based on scope and requirements. Initial audits typically take 2-4 weeks, while full implementations range from 3-6 months. We provide detailed timelines during the consultation phase.",
    value: "item-3",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer continued partnership through quarterly strategy sessions, technology updates, additional training, and custom development as your AI needs evolve.",
    value: "item-4",
  },
  {
    question: "What is your approach to data security?",
    answer:
      "We adhere to enterprise-grade security standards, including SOC 2 compliance, end-to-end encryption, and strict data governance protocols. All implementations are designed with security and privacy as core requirements.",
    value: "item-5",
  },
];

export const FAQSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.1 });
  const { ref: accordionRef, isVisible: accordionVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div
        ref={headerRef}
        className={`text-center mb-8 transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-lg text-muted-foreground text-center mb-2 tracking-wider">
          FAQ
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Common questions about our services and approach
        </p>
      </div>

      <div
        ref={accordionRef}
        className={`transition-all duration-700 ${
          accordionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <Accordion type="single" collapsible className="AccordionRoot bg-background/40 backdrop-blur-md border border-muted-foreground/20 rounded-lg p-4 shadow-lg">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value} className="border-muted-foreground/20">
            <AccordionTrigger className="text-left hover:text-foreground transition-colors">
              {question}
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>
      </div>
    </section>
  );
};
