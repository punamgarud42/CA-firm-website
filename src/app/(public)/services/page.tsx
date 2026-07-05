import { ServicesSection } from "@/components/website/services-section";
import { CTASection } from "@/components/website/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CA Services | Income Tax, GST, Audit & More",
  description:
    "Complete CA services: Income Tax Filing, GST Registration, ROC Compliance, Audit, Company Registration, Startup Advisory and more.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-hero py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            All CA Services Under One Roof
          </h1>
          <p className="text-xl text-white/80">
            Expert chartered accountant services for every business need — from startup to enterprise.
          </p>
        </div>
      </div>
      <ServicesSection />
      <CTASection />
    </div>
  );
}
