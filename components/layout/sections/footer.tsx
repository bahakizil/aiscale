import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-gradient-to-br from-background/40 via-purple-950/3 to-background/40 backdrop-blur-md border border-purple-500/10 rounded-2xl shadow-lg shadow-purple-500/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/ai-consulting" className="flex font-bold items-center mb-4">
              <h3 className="text-2xl font-bold tracking-tight font-heading">ai scale</h3>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Enterprise AI solutions that transform operations, automate workflows, and drive measurable results.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg mb-2">Services</h3>
            <div>
              <span className="text-muted-foreground">
                Consulting
              </span>
            </div>

            <div>
              <span className="text-muted-foreground">
                Audit
              </span>
            </div>

            <div>
              <span className="text-muted-foreground">
                Training
              </span>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-muted-foreground/20" />
        <section className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} ai scale. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#typeform" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Book Consultation
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
};
