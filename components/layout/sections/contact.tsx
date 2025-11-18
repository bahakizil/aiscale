import {
  Card,
} from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="container py-24 sm:py-32">
      <div className="text-center mb-12 animate-fadeIn">
        <h2 className="text-lg text-muted-foreground mb-2 tracking-wider">
          Contact
        </h2>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ready to transform your business with AI? Reach out to discuss your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-background/40 backdrop-blur-md border-muted-foreground/20 p-8 hover:bg-background/60 hover:border-muted-foreground/40 transition-all duration-300 shadow-lg animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <h3 className="text-2xl font-bold mb-6">What to Expect</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-6 h-6 bg-foreground/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <span className="ml-3 text-muted-foreground">
                Comprehensive assessment of your AI readiness
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 bg-foreground/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <span className="ml-3 text-muted-foreground">
                Strategic roadmap tailored to your objectives
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 bg-foreground/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <span className="ml-3 text-muted-foreground">
                Technical feasibility analysis
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 bg-foreground/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <span className="ml-3 text-muted-foreground">
                Detailed implementation timeline
              </span>
            </li>
          </ul>
        </Card>

        <Card className="bg-background/40 backdrop-blur-md border-muted-foreground/20 p-8 hover:bg-background/60 hover:border-muted-foreground/40 transition-all duration-300 shadow-lg animate-fadeIn" style={{ animationDelay: "200ms" }}>
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-5 h-5 mr-3 text-foreground/60" />
              <span>contact@aiconsulting.com</span>
            </div>
            <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="w-5 h-5 mr-3 text-foreground/60" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <MapPin className="w-5 h-5 mr-3 text-foreground/60" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
