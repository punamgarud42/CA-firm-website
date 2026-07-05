import { HeroSection } from "@/components/website/hero-section";
import { ServicesSection } from "@/components/website/services-section";
import { WhyChooseUs } from "@/components/website/why-choose-us";
import { StatsSection } from "@/components/website/stats-section";
import { TestimonialsSection } from "@/components/website/testimonials-section";
import { IndustriesSection } from "@/components/website/industries-section";
import { CTASection } from "@/components/website/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Tax, Audit & Compliance Solutions for Growing Businesses",
  description:
    "TaxPro CA Firm — Helping startups, SMEs, entrepreneurs, and corporates stay compliant while maximizing business growth. Book a free consultation today.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUs />
      <IndustriesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
