import Link from "next/link";
import { Phone, Mail, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const services = [
  { label: "Income Tax Filing", href: "/services/income-tax" },
  { label: "GST Registration", href: "/services/gst" },
  { label: "ROC Compliance", href: "/services/roc" },
  { label: "Audit & Assurance", href: "/services/audit" },
  { label: "Company Registration", href: "/services/company-registration" },
  { label: "Startup Advisory", href: "/services/startup" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Client Portal", href: "/auth/login" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37] flex items-center justify-center">
                <span className="text-[#0F172A] font-black text-sm">CA</span>
              </div>
              <span className="font-black text-xl">TaxPro</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Expert Chartered Accountant services for businesses, startups, and individuals.
              Trusted by 1000+ clients across India since 2009.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-white/70 hover:text-[#D4AF37] transition-colors">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                +91 98765 43210
              </a>
              <a href="mailto:info@taxpro.in" className="flex items-center gap-2 text-sm text-white/70 hover:text-[#D4AF37] transition-colors">
                <Mail className="h-4 w-4 text-[#D4AF37]" />
                info@taxpro.in
              </a>
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>123, Business Hub, Bandra Kurla Complex,<br />Mumbai – 400051, Maharashtra</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0F172A] transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {services.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-sm text-white/60 mb-4">
              Subscribe to our newsletter for tax updates, compliance alerts, and business insights.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] text-[#0F172A] px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#c4a030] transition-colors"
              >
                Go
              </button>
            </form>

            {/* Certifications */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-white/40 mb-3">Recognized & Certified By</p>
              <div className="flex flex-wrap gap-2">
                {["ICAI Member", "ISO 9001:2015", "DPIIT Registered"].map((cert) => (
                  <span key={cert} className="bg-white/10 text-white/70 text-xs px-2.5 py-1 rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} TaxPro CA Firm. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Sitemap"].map((item) => (
              <Link key={item} href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
