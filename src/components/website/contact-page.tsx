"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, Send } from "lucide-react";
import { submitContactForm } from "@/actions/leads";

const SERVICES = [
  "Income Tax Filing", "GST Registration & Returns", "ROC Compliance",
  "Audit & Assurance", "Accounting & Bookkeeping", "Company Registration",
  "Startup Advisory", "NRI Taxation", "Business Consulting", "Other",
];

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await submitContactForm(new FormData(e.currentTarget));
    setLoading(false);
    if (res.success) {
      setSubmitted(true);
    } else {
      setError(res.error ?? "Something went wrong.");
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-hero py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-white/80">
            Book a free 30-minute consultation with one of our expert CAs.
            No commitment required.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-[#0F172A] mb-6">Contact Information</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    label: "Call Us",
                    value: "+91 98765 43210",
                    sub: "+91 98765 43211 (Alternate)",
                    href: "tel:+919876543210",
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "+91 98765 43210",
                    sub: "Chat for quick queries",
                    href: "https://wa.me/919876543210",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "info@taxpro.in",
                    sub: "Response within 2 hours",
                    href: "mailto:info@taxpro.in",
                  },
                  {
                    icon: MapPin,
                    label: "Office",
                    value: "123, Business Hub, BKC",
                    sub: "Mumbai – 400051, Maharashtra",
                    href: "#",
                  },
                  {
                    icon: Clock,
                    label: "Business Hours",
                    value: "Mon – Sat: 9AM – 7PM",
                    sub: "Sun: 10AM – 2PM",
                    href: null,
                  },
                ].map(({ icon: Icon, label, value, sub, href }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0F172A] flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
                      {href ? (
                        <a href={href} className="font-semibold text-slate-900 hover:text-[#2563EB] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="font-semibold text-slate-900">{value}</p>
                      )}
                      <p className="text-sm text-slate-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-slate-100 rounded-2xl h-48 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">View on Google Maps</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-slate-900 mb-2">Thank You!</h3>
                <p className="text-slate-600 mb-4">
                  We've received your inquiry and will get back to you within 2 hours.
                  Our team will call you at your provided number.
                </p>
                <Button variant="primary" onClick={() => setSubmitted(false)}>
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-8">
                <h2 className="text-2xl font-black text-[#0F172A] mb-2">Book Free Consultation</h2>
                <p className="text-slate-500 mb-6">
                  Fill in the form below and our team will reach out within 2 hours.
                </p>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Your Name *" name="name" placeholder="Rajesh Sharma" required />
                    <Input label="Email Address *" name="email" type="email" placeholder="rajesh@company.com" required />
                    <Input label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" />
                    <Input label="Company Name" name="company" placeholder="ABC Pvt Ltd" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Message / Requirements
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us about your business and specific requirements..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] resize-none transition-all"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" required className="mt-1 rounded" id="consent" />
                    <label htmlFor="consent" className="text-sm text-slate-500">
                      I agree to be contacted by TaxPro CA Firm regarding my inquiry.
                      I've read the{" "}
                      <a href="/privacy" className="text-[#2563EB] hover:underline">Privacy Policy</a>.
                    </label>
                  </div>

                  <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                    <Send className="h-5 w-5" /> Book Free Consultation
                  </Button>

                  <p className="text-xs text-center text-slate-400">
                    ✓ No spam. ✓ No hidden charges. ✓ Free initial consultation.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
