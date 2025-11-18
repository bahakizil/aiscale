"use client";

import { motion } from "framer-motion";
import { Brain, Sparkles, Zap, Target, TrendingUp, Shield, ArrowRight, Cpu, Network, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const solutions = [
  {
    icon: Brain,
    title: "AI Strategy & Consulting",
    description: "Transform your business with intelligent AI strategies tailored to your unique challenges and opportunities.",
    features: ["Strategic Roadmapping", "Technology Assessment", "ROI Analysis", "Implementation Planning"],
    delay: 0.1,
  },
  {
    icon: Cpu,
    title: "Custom AI Development",
    description: "Build powerful AI solutions from scratch, designed specifically for your business processes and workflows.",
    features: ["Machine Learning Models", "Natural Language Processing", "Computer Vision", "Predictive Analytics"],
    delay: 0.2,
  },
  {
    icon: Network,
    title: "AI Integration Services",
    description: "Seamlessly integrate cutting-edge AI capabilities into your existing systems and infrastructure.",
    features: ["API Integration", "Legacy System Modernization", "Automation Workflows", "Data Pipeline Design"],
    delay: 0.3,
  },
  {
    icon: Shield,
    title: "AI Security & Compliance",
    description: "Ensure your AI systems are secure, ethical, and compliant with industry regulations and best practices.",
    features: ["Security Audits", "Bias Detection", "Compliance Framework", "Risk Assessment"],
    delay: 0.4,
  },
  {
    icon: BarChart,
    title: "AI Analytics & Insights",
    description: "Unlock actionable insights from your data with advanced AI-powered analytics and visualization tools.",
    features: ["Real-time Dashboards", "Predictive Modeling", "Trend Analysis", "Performance Metrics"],
    delay: 0.5,
  },
  {
    icon: TrendingUp,
    title: "AI Optimization & Scaling",
    description: "Optimize and scale your AI systems for maximum performance, efficiency, and business impact.",
    features: ["Model Optimization", "Infrastructure Scaling", "Cost Reduction", "Performance Tuning"],
    delay: 0.6,
  },
];

export const SolutionsSection = () => {
  return (
    <section id="solutions" className="relative py-32 px-4 overflow-hidden">

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5 border border-purple-500/20 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">AI-Powered Solutions</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Solutions
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Cutting-edge AI solutions designed to drive innovation, efficiency, and growth for your business
          </motion.p>

          {/* Thinking indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
          >
            <Target className="w-5 h-5 text-purple-400" />
            <span>Powered by advanced AI technology</span>
          </motion.div>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.title} solution={solution} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-background/40 via-purple-950/5 to-background/40 backdrop-blur-md border border-purple-500/20 overflow-hidden">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our AI solutions can help you achieve your goals
            </p>
            <Link href="#typeform">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white border-none shadow-lg shadow-purple-500/20 group"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function SolutionCard({ solution, index }: { solution: typeof solutions[0]; index: number }) {
  const Icon = solution.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: solution.delay }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      {/* Card content */}
      <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-background/40 via-purple-950/3 to-background/40 backdrop-blur-md border border-purple-500/10 hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300 overflow-hidden">

        {/* Animated visual in background */}
        <div className="absolute top-1/2 right-8 opacity-10">
          {index === 0 && <BrainAnimation />}
          {index === 1 && <CodeAnimation />}
          {index === 2 && <WorkflowAnimation />}
          {index === 3 && <ShieldAnimation />}
          {index === 4 && <ChartAnimation />}
          {index === 5 && <ScaleAnimation />}
        </div>

        {/* Icon */}
        <div className="mb-6 relative z-10">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/10 flex items-center justify-center">
            <Icon className="w-7 h-7 text-purple-300" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 relative z-10">
          {solution.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
          {solution.description}
        </p>

        {/* Features */}
        <div className="space-y-2 relative z-10">
          {solution.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: solution.delay + i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-400/50" />
              <span className="text-muted-foreground">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Learn more link */}
        <motion.div
          className="mt-6 pt-6 border-t border-muted-foreground/10 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: solution.delay + 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="#typeform"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group/link"
          >
            Learn more
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Animation Components
function BrainAnimation() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      {[...Array(5)].map((_, i) => (
        <circle
          key={i}
          cx="60"
          cy="60"
          r={20 + i * 10}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity={0.2}
        />
      ))}
    </svg>
  );
}

function CodeAnimation() {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-2 bg-muted-foreground/20 rounded"
          style={{ width: `${60 - i * 10}px` }}
        />
      ))}
    </div>
  );
}

function WorkflowAnimation() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <path
        d="M20 60 L50 60 L50 30 L80 30 L80 60 L110 60"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.2"
      />
      {[20, 50, 80, 110].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={i % 2 === 0 ? 60 : 30}
          r="6"
          fill="currentColor"
          opacity="0.2"
        />
      ))}
    </svg>
  );
}

function ShieldAnimation() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <path
        d="M50 10 L80 25 L80 50 Q80 75 50 90 Q20 75 20 50 L20 25 Z"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M35 50 L45 60 L65 40"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.2"
      />
    </svg>
  );
}

function ChartAnimation() {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      {[20, 40, 60, 80, 100].map((x, i) => (
        <rect
          key={i}
          x={x - 5}
          y={80 - (i + 1) * 12}
          width="8"
          height={(i + 1) * 12}
          fill="currentColor"
          opacity="0.2"
        />
      ))}
    </svg>
  );
}

function ScaleAnimation() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <circle
        cx="60"
        cy="60"
        r="30"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M40 60 L60 40 L80 60"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.2"
      />
    </svg>
  );
}
