"use client";
import { useEffect } from "react";

export const TypeformSection = () => {
  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="typeform" className="w-full py-24 sm:py-32 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-lg text-muted-foreground mb-2 tracking-wider">
            Book a Consultation
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started Today</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule your consultation and let&apos;s discuss how AI can transform your business
          </p>
        </div>

        <div
          className="mx-auto max-w-5xl rounded-2xl shadow-2xl border border-muted-foreground/30 animate-fadeIn hover:border-muted-foreground/50 transition-all duration-500 overflow-hidden"
          style={{
            height: "650px",
            animationDelay: "200ms",
            backgroundColor: "#000000"
          }}
        >
          <div
            data-tf-live="01K9SP300X3FB584AQZYCKEWC2"
            data-tf-opacity="100"
            data-tf-hide-headers
            data-tf-hide-footer
            data-tf-iframe-props="title=Contact Form"
            data-tf-medium="snippet"
            className="typeform-embed"
            style={{
              width: "100%",
              height: "650px",
              backgroundColor: "#000000"
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};
