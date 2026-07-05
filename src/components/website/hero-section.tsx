"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Play,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const trustBadges = [
  { icon: Shield, text: "RBI Compliant" },
  { icon: Award, text: "ICAI Certified" },
  { icon: TrendingUp, text: "ISO 9001:2015" },
];

const highlights = [
  "No hidden charges",
  "Dedicated CA assigned",
  "Real-time compliance tracking",
  "Secure document vault",
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden flex items-center">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500 filter blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#D4AF37] filter blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-white">
            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {trustBadges.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium"
                >
                  <Icon className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {text}
                </div>
              ))}
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Expert Tax, Audit &{" "}
              <span className="text-[#D4AF37]">Compliance Solutions</span>{" "}
              for Growing Businesses
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              Helping startups, SMEs, entrepreneurs, and corporates stay fully compliant
              while maximizing business growth. Trusted by 1000+ businesses across India.
            </p>

            {/* Highlights */}
            <ul className="grid grid-cols-2 gap-2 mb-10">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  "h-14 px-10 text-base bg-[#D4AF37] text-[#0F172A] hover:bg-[#c4a030] shadow-gold font-bold"
                )}
              >
                Book Free Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Button
                variant="white"
                size="xl"
                className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-[#0F172A]"
                asChild
              >
                <Link href="/services">
                  <Play className="h-5 w-5" />
                  Talk to an Expert
                </Link>
              </Button>
            </div>
          </div>

          {/* Right: Stats Cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { number: "1000+", label: "Happy Clients", sublabel: "Across India", color: "from-blue-500/20 to-blue-600/20" },
              { number: "15+", label: "Years Experience", sublabel: "Industry Expertise", color: "from-purple-500/20 to-purple-600/20" },
              { number: "₹500Cr+", label: "Transactions Managed", sublabel: "Annually", color: "from-amber-500/20 to-amber-600/20" },
              { number: "98%", label: "Client Retention", sublabel: "Year over Year", color: "from-green-500/20 to-green-600/20" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white`}
              >
                <div className="text-3xl font-black text-[#D4AF37] mb-1">{stat.number}</div>
                <div className="font-semibold">{stat.label}</div>
                <div className="text-sm text-white/60 mt-1">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 840 0 720 20C600 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
