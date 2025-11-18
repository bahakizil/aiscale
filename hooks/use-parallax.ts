"use client";
import { useEffect, useRef, useState } from "react";

interface UseParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, direction = "up" } = options;
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const viewportHeight = window.innerHeight;

      // Only calculate parallax when element is in or near viewport
      if (
        scrolled + viewportHeight > elementTop &&
        scrolled < elementTop + rect.height
      ) {
        const parallaxOffset =
          (scrolled - elementTop + viewportHeight) * speed;
        setOffset(direction === "up" ? -parallaxOffset : parallaxOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return { ref, offset };
};
