"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import Link from "next/link";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useParallax } from "@/hooks/use-parallax";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const HeroSection = () => {
  const { ref: parallaxRef1, offset: offset1 } = useParallax({ speed: 0.3 });
  const { ref: parallaxRef2, offset: offset2 } = useParallax({ speed: 0.5, direction: "down" });
  const { ref: parallaxRef3, offset: offset3 } = useParallax({ speed: 0.2 });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} className="w-full relative overflow-hidden bg-background">
      <div className="container pb-0">
        {/* Animated grid background */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:14px_24px]"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background"></div>
        </div>

        {/* Enhanced animated glow orbs */}
        <motion.div
          ref={parallaxRef1}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/30 rounded-full blur-3xl -z-10"
          style={{ transform: `translateY(${offset1}px)` }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div
          ref={parallaxRef2}
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-foreground/25 rounded-full blur-3xl -z-10"
          style={{ transform: `translateY(${offset2}px)` }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
        <motion.div
          ref={parallaxRef3}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-foreground/20 rounded-full blur-3xl -z-10"
          style={{ transform: `translateY(${offset3}px)` }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>

        {/* Brighter white glow behind text with animation */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-foreground/25 rounded-full blur-[150px] -z-10"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-foreground/20 rounded-full blur-[120px] -z-10"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 right-1/3 w-96 h-96 bg-foreground/20 rounded-full blur-[120px] -z-10"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>

        {/* Floating icons with enhanced animations */}
        <motion.div
          className="absolute top-20 right-20 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="p-3 bg-gradient-to-br from-background/40 via-purple-950/5 to-background/40 backdrop-blur-md border border-purple-500/10 rounded-xl shadow-lg shadow-purple-500/5"
            whileHover={{ scale: 1.1, rotate: 15 }}
          >
            <Sparkles className="w-6 h-6 text-purple-400" />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-20 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <motion.div
            className="p-3 bg-gradient-to-br from-background/40 via-purple-950/5 to-background/40 backdrop-blur-md border border-purple-500/10 rounded-xl shadow-lg shadow-purple-500/5"
            whileHover={{ scale: 1.1, rotate: -15 }}
          >
            <Zap className="w-6 h-6 text-purple-400" />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-32 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <motion.div
            className="p-3 bg-gradient-to-br from-background/40 via-purple-950/5 to-background/40 backdrop-blur-md border border-purple-500/10 rounded-xl shadow-lg shadow-purple-500/5"
            whileHover={{ scale: 1.1, rotate: 20 }}
          >
            <Target className="w-6 h-6 text-purple-400" />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid place-items-center lg:max-w-screen-xl gap-6 mx-auto pt-16 md:pt-24 pb-8 md:pb-12 relative z-10"
          style={{ opacity, scale, y }}
        >
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Badge variant="outline" className="text-xs py-1.5 px-3 border-purple-500/20 bg-gradient-to-r from-background/40 via-purple-950/5 to-background/40 backdrop-blur-md shadow-lg shadow-purple-500/10 hover:bg-background/60 transition-all font-medium">
                <Sparkles className="w-3 h-3 mr-1.5 inline text-muted-foreground" />
                <span className="text-muted-foreground">
                  Enterprise-Grade AI Solutions
                </span>
              </Badge>
            </motion.div>

            <div className="max-w-6xl mx-auto text-center space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-medium tracking-[-0.02em] leading-[0.95] font-heading relative">
                  <span className="relative inline-block">
                    <span className="relative z-10">Scale Your</span>
                    <motion.span
                      className="absolute -inset-4 bg-foreground/20 blur-3xl rounded-full"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [0.95, 1.05, 0.95],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              >
                <h2 className="text-7xl md:text-8xl lg:text-9xl font-medium tracking-[-0.02em] leading-[0.95] font-heading relative">
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Business with AI
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/25 to-transparent blur-2xl"
                      animate={{
                        x: [-100, 100],
                        opacity: [0, 0.5, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </span>
                </h2>
              </motion.div>

              <motion.div
                className="h-0.5 w-20 bg-foreground mx-auto mt-8"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 80, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
              />
            </div>

            <motion.p
              className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground/90 leading-relaxed font-body font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              Enterprise AI solutions that transform operations, automate workflows, and drive measurable results.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-6 md:gap-12 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedCounter
                  end={500}
                  suffix="+"
                  duration={2500}
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-0.5"
                />
                <div className="text-xs font-medium text-muted-foreground/70 tracking-wide uppercase">Projects</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedCounter
                  end={98}
                  suffix="%"
                  duration={2500}
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-0.5"
                />
                <div className="text-xs font-medium text-muted-foreground/70 tracking-wide uppercase">Satisfaction</div>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl md:text-4xl font-bold tracking-tight mb-0.5">24/7</div>
                <div className="text-xs font-medium text-muted-foreground/70 tracking-wide uppercase">Support</div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row gap-3 justify-center pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
            >
              <MagneticButton>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button asChild size="default" className="w-full md:w-auto font-semibold group/arrow bg-foreground hover:bg-foreground/90 backdrop-blur-md shadow-xl hover:shadow-foreground/20 transition-all px-6 relative overflow-hidden">
                    <Link href="#typeform">
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: [-100, 200],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: "linear"
                        }}
                      />
                      Book a Consultation
                      <ArrowRight className="size-4 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </MagneticButton>

              <MagneticButton>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    size="default"
                    variant="outline"
                    className="w-full md:w-auto font-semibold border-foreground/20 bg-background/40 backdrop-blur-md hover:bg-background/60 hover:border-foreground/30 shadow-lg transition-all px-6"
                  >
                    <Link href="#services">
                      Explore Services
                    </Link>
                  </Button>
                </motion.div>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
