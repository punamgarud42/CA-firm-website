import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Target, Eye, Heart, Users, TrendingUp, Shield, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | TaxPro CA Firm",
  description: "Learn about TaxPro CA Firm — 15+ years of expert CA services in India.",
};

const values = [
  { icon: Shield, title: "Integrity", description: "We maintain the highest standards of professional ethics and transparency in every engagement." },
  { icon: Star, title: "Excellence", description: "We deliver outstanding quality in every service, exceeding client expectations consistently." },
  { icon: Users, title: "Client First", description: "Our clients' success is our success. Every decision is made with their best interests in mind." },
  { icon: TrendingUp, title: "Innovation", description: "We leverage technology to deliver faster, smarter, and more efficient CA services." },
];

const team = [
  { name: "CA Rajesh Gupta", role: "Founder & Managing Partner", exp: "25+ years", specialization: "Corporate Tax & M&A" },
  { name: "CA Priya Sharma", role: "Senior Partner", exp: "18+ years", specialization: "GST & Indirect Tax" },
  { name: "CA Amit Joshi", role: "Partner – Audit", exp: "15+ years", specialization: "Statutory & Internal Audit" },
  { name: "CA Neha Patel", role: "Partner – Advisory", exp: "12+ years", specialization: "Startup & FEMA Advisory" },
];

const certifications = [
  "ICAI Member (FCA)", "ISO 9001:2015 Certified",
  "DPIIT Registered", "GST Practitioner", "Registered Valuer", "Insolvency Professional"
];

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-hero py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] rounded-full filter blur-2xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black text-white mb-6">
            15+ Years of Trusted<br />CA Excellence
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Founded in 2009, TaxPro CA Firm has grown from a single-CA practice into a
            full-service chartered accountancy firm serving 1000+ businesses across India.
          </p>
        </div>
      </div>

      {/* Founder Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block bg-amber-50 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                Our Story
              </span>
              <h2 className="text-4xl font-black text-[#0F172A] mb-6">
                From a Passion for Numbers to India's Trusted CA Partner
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  TaxPro was founded in 2009 by CA Rajesh Gupta with a simple but powerful vision:
                  to make professional CA services accessible to every business — from corner shop to corporate giant.
                </p>
                <p>
                  Starting with just 5 clients in Mumbai, we built our reputation on one principle:
                  every client deserves the same quality of advice that large corporations receive.
                </p>
                <p>
                  Today, our team of 50+ qualified CAs serves 1000+ clients across 25+ cities,
                  managing over ₹500 crores in annual transactions with a 98% client retention rate.
                </p>
              </div>
              <div className="mt-8">
                <Button variant="primary" asChild>
                  <Link href="/contact">Work With Us</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "2009", label: "Founded" },
                { number: "50+", label: "CA Professionals" },
                { number: "25+", label: "Cities Served" },
                { number: "1000+", label: "Happy Clients" },
              ].map(({ number, label }) => (
                <div key={label} className="bg-[#F8FAFC] rounded-2xl p-6 text-center border border-slate-100">
                  <div className="text-3xl font-black text-[#2563EB] mb-1">{number}</div>
                  <div className="text-sm font-medium text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-card">
              <div className="inline-flex p-3 rounded-xl bg-blue-50 mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To empower every Indian business with expert financial guidance, ensuring compliance
                while maximizing growth through technology-driven CA services that are accessible,
                transparent, and genuinely impactful.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-card">
              <div className="inline-flex p-3 rounded-xl bg-amber-50 mb-4">
                <Eye className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To become India's most trusted CA firm — recognized for our commitment to excellence,
                ethical practice, and the measurable positive impact we create for every client
                we serve, from startup to enterprise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#0F172A] mb-4">Our Core Values</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#f0c040] rounded-full mx-auto" />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center p-6 rounded-2xl border border-slate-100 hover:shadow-card transition-shadow">
                <div className="inline-flex p-3 rounded-xl bg-[#0F172A] mb-4">
                  <Icon className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#0F172A] mb-4">Leadership Team</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#f0c040] rounded-full mx-auto mb-4" />
            <p className="text-slate-500">Experienced CAs leading with expertise and integrity</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-card">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white text-xl font-black mx-auto mb-4">
                  {member.name.split(" ")[2]?.[0] ?? member.name.split(" ")[1][0]}
                </div>
                <h3 className="font-bold text-slate-900 mb-0.5">{member.name}</h3>
                <p className="text-sm text-[#2563EB] font-medium mb-2">{member.role}</p>
                <p className="text-xs text-slate-500">{member.specialization}</p>
                <p className="text-xs font-medium text-slate-700 mt-2">{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black text-[#0F172A] mb-8">Certifications & Recognitions</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700">
                <Award className="h-4 w-4 text-[#D4AF37]" />
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
