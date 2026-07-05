import { Users, Clock, Eye, Zap, Shield, HeadphonesIcon, Award, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert CA Team",
    description: "50+ qualified chartered accountants with specialization across all tax domains and industries.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Your own assigned CA with direct WhatsApp & email access. No call centers.",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    description: "Fixed fees with zero hidden charges. Know exactly what you pay before we start.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Most filings completed within 48 hours. Urgent requests handled same-day.",
  },
  {
    icon: Shield,
    title: "100% Compliant",
    description: "Strict quality checks ensure zero penalties. We file with absolute accuracy.",
  },
  {
    icon: TrendingUp,
    title: "Tax Optimization",
    description: "Proactive tax planning to legally minimize your tax liability and maximize savings.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "15+ years serving 1000+ businesses with 98% client retention speaks for itself.",
  },
  {
    icon: Clock,
    title: "Real-time Tracking",
    description: "Client portal gives you live visibility into all filings, documents, and compliance status.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="inline-block bg-amber-50 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              Why TaxPro?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0F172A] mb-4">
              Why Businesses Choose Us Over Others
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#f0c040] rounded-full mb-6" />
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We're not just accountants — we're your strategic financial partners.
              With deep expertise, cutting-edge technology, and a client-first approach,
              we help businesses stay compliant and grow profitably.
            </p>

            {/* Case study highlight */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1e3a8a] rounded-2xl p-6 text-white">
              <div className="text-4xl font-black text-[#D4AF37] mb-2">₹12L+</div>
              <div className="font-semibold text-lg mb-1">Tax Savings for a Client</div>
              <p className="text-white/70 text-sm">
                "TaxPro's proactive tax planning saved us over ₹12 lakhs in the last financial year
                through legitimate deductions and restructuring."
              </p>
              <div className="mt-3 text-sm text-white/50">— MD, Manufacturing Company, Pune</div>
            </div>
          </div>

          {/* Right: Feature grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-5 rounded-2xl border border-slate-100 hover:border-[#2563EB]/30 hover:bg-blue-50/30 transition-all duration-200 group"
                >
                  <div className="inline-flex p-2.5 rounded-xl bg-[#0F172A] mb-3 group-hover:bg-[#2563EB] transition-colors">
                    <Icon className="h-5 w-5 text-[#D4AF37] group-hover:text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1.5 text-sm">{feature.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
