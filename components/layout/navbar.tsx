"use client";
import { Menu } from "lucide-react";
import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#typeform",
    label: "Book Consultation",
  },
  {
    href: "#solutions",
    label: "Solutions",
  },
  {
    href: "#services",
    label: "Services",
  },
  {
    href: "#case-studies",
    label: "Case Studies",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky z-40 rounded-2xl flex justify-between items-center p-2 transition-all duration-300 ${
      scrolled
        ? "bg-gradient-to-br from-background/80 via-purple-950/5 to-background/80 backdrop-blur-lg border border-purple-500/10 shadow-2xl shadow-purple-500/5"
        : "bg-gradient-to-br from-background/40 via-purple-950/3 to-background/40 backdrop-blur-md border border-purple-500/5 shadow-lg"
    }`}>
      <Link href="/ai-consulting" className="flex items-center gap-3 group ml-4">
        <div className="relative w-8 h-8 md:w-10 md:h-10" style={{ filter: 'brightness(1.2) contrast(1.1)' }}>
          <Image
            src="/logo.png"
            alt="AI Scale Logo"
            fill
            className="object-contain group-hover:scale-110 transition-transform"
            style={{ filter: 'brightness(1.5) contrast(1.2)', mixBlendMode: 'screen' }}
            priority
          />
        </div>
        <span className="text-xl md:text-2xl font-bold tracking-tight font-heading group-hover:scale-105 transition-transform">
          ai scale
        </span>
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-background/95 backdrop-blur-lg border-muted-foreground/20"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/ai-consulting" className="flex items-center gap-3">
                    <div className="relative w-8 h-8" style={{ filter: 'brightness(1.2) contrast(1.1)' }}>
                      <Image
                        src="/logo.png"
                        alt="AI Scale Logo"
                        fill
                        className="object-contain"
                        style={{ filter: 'brightness(1.5) contrast(1.2)', mixBlendMode: 'screen' }}
                      />
                    </div>
                    <span className="text-xl font-bold tracking-tight font-heading">
                      ai scale
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <nav className="hidden lg:flex items-center gap-6 mx-auto">
        {routeList.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            {label}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-foreground group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-2">
        <Button asChild size="sm" className="bg-foreground/90 hover:bg-foreground backdrop-blur-sm font-semibold">
          <Link href="#typeform">
            Get Started
          </Link>
        </Button>
      </div>
    </header>
  );
};
