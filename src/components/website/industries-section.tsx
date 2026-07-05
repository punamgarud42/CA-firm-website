import { Cpu, Factory, Heart, Building, ShoppingCart, Banknote, Briefcase, GraduationCap } from "lucide-react";

const industries = [
  { icon: Cpu, name: "Technology & IT", clients: "200+ clients", color: "bg-blue-50 text-blue-600" },
  { icon: Factory, name: "Manufacturing", clients: "150+ clients", color: "bg-orange-50 text-orange-600" },
  { icon: Heart, name: "Healthcare", clients: "80+ clients", color: "bg-red-50 text-red-600" },
  { icon: Building, name: "Real Estate", clients: "120+ clients", color: "bg-purple-50 text-purple-600" },
  { icon: ShoppingCart, name: "E-Commerce", clients: "200+ clients", color: "bg-green-50 text-green-600" },
  { icon: Banknote, name: "Finance & NBFC", clients: "60+ clients", color: "bg-teal-50 text-teal-600" },
  { icon: Briefcase, name: "Professional Services", clients: "180+ clients", color: "bg-indigo-50 text-indigo-600" },
  { icon: GraduationCap, name: "Education", clients: "40+ clients", color: "bg-yellow-50 text-yellow-600" },
];

export function IndustriesSection() {
  return (
    <section className="section-padding bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-50 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Industries We Serve
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">
            Deep Expertise Across Industries
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#f0c040] rounded-full mx-auto mb-4" />
          <p className="text-slate-600 max-w-xl mx-auto">
            Industry-specific tax knowledge means better compliance and bigger savings for your business.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="bg-white rounded-2xl p-6 text-center border border-slate-100 hover:border-[#2563EB]/30 hover:shadow-card transition-all duration-200 group cursor-pointer"
              >
                <div className={`inline-flex p-3 rounded-xl ${ind.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{ind.name}</h3>
                <p className="text-xs text-slate-500">{ind.clients}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
