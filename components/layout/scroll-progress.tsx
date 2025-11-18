"use client";
import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-background/20 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 transition-all duration-150 ease-out shadow-lg"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
