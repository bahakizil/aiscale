"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Link from "next/link";

export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show after scrolling past hero section (approx 800px)
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-20 pointer-events-none"
      }`}
    >
      <Button
        asChild
        size="lg"
        className="bg-foreground/95 hover:bg-foreground backdrop-blur-md shadow-2xl hover:shadow-foreground/30 hover:scale-105 transition-all group px-8 rounded-full font-semibold"
      >
        <Link href="#typeform" className="flex items-center gap-2">
          <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Book Free Consultation
        </Link>
      </Button>
    </div>
  );
};
