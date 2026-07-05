"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    company: "TechVentures Pvt Ltd",
    role: "Managing Director",
    rating: 5,
    review: "TaxPro has been our CA partner for 8 years. Their proactive approach to tax planning saved us over ₹15 lakhs last year. The client portal makes tracking our compliance status incredibly easy.",
    image: null,
  },
  {
    name: "Priya Mehta",
    company: "FashionForward India",
    role: "Founder & CEO",
    rating: 5,
    review: "As a startup founder, navigating GST and ROC filings was a nightmare until we found TaxPro. They handle everything seamlessly and our dedicated CA is always reachable on WhatsApp.",
    image: null,
  },
  {
    name: "Suresh Kumar",
    company: "Sunrise Manufacturing",
    role: "CFO",
    rating: 5,
    review: "The audit team at TaxPro is exceptional. They completed our statutory audit in record time without disrupting our operations. Highly professional and technically strong team.",
    image: null,
  },
  {
    name: "Ananya Singh",
    company: "MedCare Hospitals",
    role: "Director Finance",
    rating: 5,
    review: "Healthcare taxation is complex but TaxPro's team has deep industry knowledge. They've helped us optimize our tax structure and maintain 100% compliance. Truly the best CA firm in the city.",
    image: null,
  },
  {
    name: "Mohammed Raza",
    company: "Raza Exports",
    role: "Partner",
    rating: 5,
    review: "Our NRI taxation and FEMA compliance is handled completely by TaxPro. They understand cross-border transactions and always keep us ahead of regulatory changes.",
    image: null,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[(current) % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-green-50 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-4">
            What Our Clients Say
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#D4AF37] to-[#f0c040] rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-[#D4AF37] fill-[#D4AF37]" />
              ))}
            </div>
            <span className="font-semibold">4.9/5</span>
            <span className="text-slate-400">from 500+ reviews on Google</span>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {visible.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-slate-100" />
              <StarRating rating={t.rating} />
              <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-6 line-clamp-4">
                "{t.review}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(t.name)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}, {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="p-2.5 rounded-full border border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-[#2563EB]" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="p-2.5 rounded-full border border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
