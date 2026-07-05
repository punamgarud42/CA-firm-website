import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cpu, Factory, Heart, Building, ShoppingCart, Banknote, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | TaxPro CA Firm",
  description: "TaxPro CA Firm provides specialized accounting and tax services across Technology, Manufacturing, Healthcare, Real Estate, E-Commerce, and more.",
};

const INDUSTRIES = [
  {
    icon: Cpu,
    name: "Technology & IT",
    description: "Software companies, SaaS startups, IT services. Special expertise in ESOPs, R&D deductions, SEZ benefits, and transfer pricing.",
    services: ["Income Tax & MAT", "Transfer Pricing", "ESOP Advisory", "GST for IT Services", "SEZ Compliance"],
    color: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
    clients: "200+",
  },
  {
    icon: Factory,
    name: "Manufacturing",
    description: "Industrial manufacturers, MSME units. GST reconciliation, export benefits, customs duty optimization, and cost audits.",
    services: ["GST & ITC Optimization", "Excise & Customs", "Cost Audit", "Export Benefits", "MSME Registration"],
    color: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
    clients: "150+",
  },
  {
    icon: Heart,
    name: "Healthcare",
    description: "Hospitals, clinics, pharma companies. GST exemption analysis, Section 11 benefits, and healthcare-specific deductions.",
    services: ["GST Exemption Analysis", "Hospital Trust Compliance", "Pharma GST", "Doctor Tax Planning", "Drug License Renewals"],
    color: "from-red-50 to-red-100",
    iconColor: "text-red-600",
    clients: "80+",
  },
  {
    icon: Building,
    name: "Real Estate",
    description: "Developers, builders, property investors. GST under construction, capital gains planning, and JDA tax implications.",
    services: ["Real Estate GST", "Capital Gains Tax", "JDA Compliance", "Rental Income Planning", "NRI Property Sale"],
    color: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
    clients: "120+",
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce",
    description: "Online retailers, marketplaces, D2C brands. TCS/TDS compliance, marketplace GST, and cross-border tax issues.",
    services: ["Marketplace GST & TCS", "D2C Tax Planning", "Import Duty Planning", "Cross-border Tax", "FEMA Compliance"],
    color: "from-green-50 to-green-100",
    iconColor: "text-green-600",
    clients: "200+",
  },
  {
    icon: Banknote,
    name: "Finance & NBFC",
    description: "NBFCs, HFCs, microfinance. RBI compliance, Ind-AS implementation, and special tax provisions for financial entities.",
    services: ["NBFC RBI Compliance", "Ind-AS Implementation", "GST for Financial Services", "TDS on Interest", "Priority Sector Lending"],
    color: "from-teal-50 to-teal-100",
    iconColor: "text-teal-600",
    clients: "60+",
  },
  {
    icon: Briefcase,
    name: "Professional Services",
    description: "Law firms, consultancies, architects. Section 44ADA, LLP taxation, and TDS compliance for service providers.",
    services: ["Section 44ADA", "LLP Tax Compliance", "TDS on Professional Fees", "Service Tax Transition", "Partnership Taxation"],
    color: "from-indigo-50 to-indigo-100",
    iconColor: "text-indigo-600",
    clients: "180+",
  },
  {
    icon: GraduationCap,
    name: "Education",
    description: "Schools, colleges, coaching centres. Section 10 & 11 exemptions, GST on educational services, and trust compliance.",
    services: ["Section 10/11 Exemptions", "Education Trust Audit", "GST on Courses", "Society Registration", "FCRA Compliance"],
    color: "from-yellow-50 to-yellow-100",
    iconColor: "text-yellow-600",
    clients: "40+",
  },
];

export default function IndustriesPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-hero py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37] rounded-full filter blur-2xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Industry-Specific CA Expertise
          </h1>
          <p className="text-xl text-white/80">
            Deep domain knowledge across 8 major industries means better compliance,
            optimized taxes, and fewer surprises.
          </p>
        </div>
      </div>

      {/* Industry Cards */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {INDUSTRIES.map((industry) => {
              const Icon = industry.icon;
              return (
                <div
                  key={industry.name}
                  className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className={`bg-gradient-to-br ${industry.color} p-6 flex items-start gap-4`}>
                    <div className="inline-flex p-3 bg-white rounded-xl shadow-sm">
                      <Icon className={`h-6 w-6 ${industry.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-[#0F172A]">{industry.name}</h2>
                      <span className="text-sm font-medium text-slate-600">{industry.clients} clients</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {industry.description}
                    </p>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
                      Key Services
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {industry.services.map((svc) => (
                        <span key={svc} className="text-xs bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full font-medium">
                          {svc}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] group-hover:gap-3 transition-all"
                    >
                      Get Industry-Specific Quote <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-hero">
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-black text-white mb-4">Don't See Your Industry?</h2>
          <p className="text-white/80 mb-8">
            We serve businesses across all sectors. Talk to us about your specific needs.
          </p>
          <Button variant="gold" size="xl" asChild>
            <Link href="/contact">
              Discuss Your Requirements <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
