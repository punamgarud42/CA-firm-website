"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Shield,
  TrendingUp,
  FileText,
  Building2,
  Calculator,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Income Tax Filing", href: "/services/income-tax", icon: FileText },
      { label: "GST Registration & Returns", href: "/services/gst", icon: Shield },
      { label: "ROC Compliance", href: "/services/roc", icon: Building2 },
      { label: "Audit & Assurance", href: "/services/audit", icon: TrendingUp },
      { label: "Accounting & Bookkeeping", href: "/services/accounting", icon: Calculator },
      { label: "Company Registration", href: "/services/company-registration", icon: Building2 },
      { label: "Startup Advisory", href: "/services/startup", icon: TrendingUp },
      { label: "NRI Taxation", href: "/services/nri", icon: Users },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200"
          : "bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20 w-full">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 min-w-fit">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37] flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-[#0F172A] font-black text-sm">CA</span>
          </div>
          <span className={cn(
            "font-black text-lg transition-colors hidden sm:inline",
            scrolled ? "text-[#0F172A]" : "text-white"
          )}>TaxPro</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 2xl:gap-12">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href={link.href} className={cn(
  "px-6 py-3 rounded-xl transition-all duration-300 text-[17px] font-semibold tracking-wide",
                scrolled 
                  ? "text-[#0F172A] hover:bg-slate-100"
                  : "text-white hover:bg-white/20"
              )}>
                <span className="flex items-center gap-1">
                  {link.label}
                  {link.children && <ChevronDown className="h-3 w-3" />}
                </span>
              </Link>

              {link.children && activeDropdown === link.label && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-xl p-2 mt-2 gsp-10">
                  {link.children.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.label} href={item.href}>
                        <span className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg transition-colors text-sm">
                          <Icon className="h-4 w-4 text-[#2563EB]" />
                          <span className="text-[#0F172A]">{item.label}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 ml-auto">
          <a href="tel:+919876543210" className={cn(
            "flex items-center gap-2 text-sm font-medium transition-colors",
            scrolled 
              ? "text-[#0F172A] hover:text-[#2563EB]"
              : "text-white hover:text-[#D4AF37]"
          )}>
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">+91 98765 43210</span>
          </a>

          <Link href="/auth/login" className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-semibold transition-all duration-200 px-4 h-10",
            scrolled
              ? "bg-[#D4AF37] text-[#0F172A] hover:bg-[#c4a030] shadow-md hover:shadow-lg"
              : "bg-[#D4AF37] text-[#0F172A] hover:bg-[#c4a030] shadow-lg"
          )}>
            Client Portal
          </Link>

          <Link href="/contact" className={cn(
            "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-semibold transition-all duration-200 px-4 h-10",
            scrolled
              ? "bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md hover:shadow-lg"
              : "bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-lg"
          )}>
            Book Consultation
          </Link>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className={cn(
          "lg:hidden p-2 rounded-lg transition-colors ml-auto flex-shrink-0",
          scrolled 
            ? "text-[#0F172A] hover:bg-slate-100"
            : "text-white hover:bg-white/20"
        )}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <div key={link.label}>
                <div
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer"
                  onClick={() => {
                    if (link.children) {
                      setActiveDropdown(activeDropdown === link.label ? null : link.label);
                    } else {
                      setMobileOpen(false);
                    }
                  }}
                >
                  <Link href={link.href} onClick={() => !link.children && setMobileOpen(false)}>
                    <span className="font-medium text-[#0F172A]">{link.label}</span>
                  </Link>
                  {link.children && (
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      activeDropdown === link.label && "rotate-180"
                    )} />
                  )}
                </div>

                {/* Mobile Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="pl-4 space-y-1 mt-2">
                    {link.children.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)}>
                          <span className="flex items-center gap-3 px-3 py-2 hover:bg-slate-100 rounded-lg transition-colors text-sm text-[#0F172A]">
                            <Icon className="h-4 w-4 text-[#2563EB]" />
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <a href="tel:+919876543210" className="flex items-center justify-center gap-2 p-3 text-[#0F172A] font-medium hover:bg-slate-50 rounded-lg transition-colors">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </a>

              <Link href="/auth/login" className="flex items-center justify-center gap-2 p-3 bg-[#D4AF37] text-[#0F172A] font-semibold rounded-lg hover:bg-[#c4a030] transition-colors">
                Client Portal
              </Link>

              <Link href="/contact" className="flex items-center justify-center gap-2 p-3 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}