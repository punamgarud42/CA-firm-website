import Link from "next/link";
import { ArrowRight, FileText, Shield, Building2, TrendingUp, Calculator, Briefcase, Lightbulb, Globe, BarChart } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Income Tax Filing",
    description: "Accurate ITR filing for individuals, businesses, and NRIs. Maximize deductions and stay compliant.",
    href: "/services/income-tax",
    color: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
    tag: "Most Popular",
  },
  {
    icon: Shield,
    title: "GST Registration & Returns",
    description: "End-to-end GST services — registration, monthly/quarterly returns, reconciliation, and audits.",
    href: "/services/gst",
    color: "from-green-50 to-green-100",
    iconColor: "text-green-600",
    tag: null,
  },
  {
    icon: Building2,
    title: "ROC Compliance",
    description: "Complete MCA filings, annual returns, board resolutions, and statutory compliance for companies.",
    href: "/services/roc",
    color: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600",
    tag: null,
  },
  {
    icon: TrendingUp,
    title: "Audit & Assurance",
    description: "Statutory, internal, and tax audits conducted by experienced CAs ensuring financial accuracy.",
    href: "/services/audit",
    color: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
    tag: null,
  },
  {
    icon: Calculator,
    title: "Accounting & Bookkeeping",
    description: "Real-time cloud accounting, ledger management, P&L statements, and balance sheet preparation.",
    href: "/services/accounting",
    color: "from-teal-50 to-teal-100",
    iconColor: "text-teal-600",
    tag: null,
  },
  {
    icon: Building2,
    title: "Company Registration",
    description: "Pvt Ltd, LLP, OPC, Section 8 — complete incorporation services with post-registration compliance.",
    href: "/services/company-registration",
    color: "from-indigo-50 to-indigo-100",
    iconColor: "text-indigo-600",
    tag: "Fast Track",
  },
  {
    icon: Lightbulb,
    title: "Startup Advisory",
    description: "Fundraising support, DPIIT recognition, startup compliances, and financial planning for founders.",
    href: "/services/startup",
    color: "from-yellow-50 to-yellow-100",
    iconColor: "text-yellow-600",
    tag: null,
  },
  {
    icon: Globe,
    title: "NRI Taxation",
    description: "Tax planning, DTAA benefits, FEMA compliance, and repatriation advisory for NRIs.",
    href: "/services/nri",
    color: "from-pink-50 to-pink-100",
    iconColor: "text-pink-600",
    tag: null,
  },
  {
    icon: BarChart,
    title: "Business Consulting",
    description: "Strategic financial advisory, business restructuring, merger support, and profitability analysis.",
    href: "/services/consulting",
    color: "from-slate-50 to-slate-100",
    iconColor: "text-slate-600",
    tag: null,
    hidden: true, // Service page not created yet
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-[#F8FAFC]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] mb-4">
            Comprehensive CA Services
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#f0c040] rounded-full mx-auto mb-6" />
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From basic tax filing to complex corporate compliance — we handle it all
            with precision, speed, and complete transparency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.filter(s => !('hidden' in s && s.hidden)).map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#2563EB]/30 hover:shadow-card-hover transition-all duration-300 relative overflow-hidden cursor-pointer block"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tag */}
                {service.tag && (
                  <span className="absolute top-4 right-4 bg-[#D4AF37] text-[#0F172A] text-xs font-bold px-2.5 py-1 rounded-full">
                    {service.tag}
                  </span>
                )}

                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-4`}>
                  <Icon className={`h-6 w-6 ${service.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-bold text-[#0F172A] text-lg mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.description}</p>

                {/* Learn More */}
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] group-hover:gap-2.5 transition-all duration-200">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-500 mb-4">Can't find what you're looking for?</p>
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold px-8 h-14 bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-lg transition-all"
          >
            Discuss Custom Requirements <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
