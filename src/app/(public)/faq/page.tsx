"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  { category: "GST", q: "When is GST registration mandatory?", a: "GST registration is mandatory if your annual aggregate turnover exceeds ₹40 lakhs for goods (₹20 lakhs for services, ₹10 lakhs for special category states). It's also mandatory for e-commerce operators, inter-state suppliers, and businesses involved in certain notified activities regardless of turnover." },
  { category: "GST", q: "What are the due dates for filing GST returns?", a: "GSTR-1 (outward supplies) is due by the 11th (monthly filers) or 13th (QRMP quarterly filers). GSTR-3B is due by the 20th for monthly filers. GSTR-9 (annual return) is due by December 31st. GSTR-9C (reconciliation) for taxpayers with turnover over ₹5 crore is also due December 31st." },
  { category: "Income Tax", q: "What is the deadline for ITR filing?", a: "For non-audit cases (individuals, HUFs, etc.), the deadline is July 31. For businesses requiring tax audit, it's October 31. For transfer pricing cases, it's November 30. Belated returns can be filed until December 31 of the assessment year with penalty." },
  { category: "Income Tax", q: "What deductions can I claim under Section 80C?", a: "Section 80C allows deductions up to ₹1.5 lakh per year for investments/payments including PPF, ELSS mutual funds, NSC, life insurance premiums, 5-year FD, home loan principal repayment, tuition fees for children, and NPS contributions (up to ₹1.5L under 80CCD(1))." },
  { category: "Income Tax", q: "Who needs to pay advance tax?", a: "Any taxpayer whose estimated tax liability for the year exceeds ₹10,000 (after TDS) must pay advance tax. Installments are 15% by June 15, 45% by September 15, 75% by December 15, and 100% by March 15. Salaried individuals with only salary income are exempt as TDS handles this." },
  { category: "Company Law", q: "What is the process for company registration?", a: "Company registration involves: (1) Obtain DSC for all directors, (2) Apply for DIN via SPICe+, (3) Reserve company name via RUN, (4) File SPICe+ with MCA along with all documents, (5) Obtain Certificate of Incorporation, (6) Apply for PAN/TAN, (7) Open bank account. Typically takes 5-7 working days." },
  { category: "Company Law", q: "What are the annual compliance requirements for a Pvt Ltd company?", a: "Annual requirements include: (1) Hold AGM within 6 months of year-end, (2) File AOC-4 (financial statements) within 30 days of AGM, (3) File MGT-7 (annual return) within 60 days of AGM, (4) File ADT-1 (auditor appointment), (5) Director KYC (DIR-3 KYC) by Sept 30, (6) Income Tax return by Oct 31." },
  { category: "TDS", q: "What is the TDS rate on professional fees?", a: "TDS under Section 194J is 10% on professional fees, technical services, and royalties. It's 2% for technical services (non-professional). TDS is deducted when the payment exceeds ₹30,000 in a financial year. The due date for deposit is the 7th of the following month (30th April for March)." },
  { category: "Startup", q: "What benefits does DPIIT startup recognition provide?", a: "DPIIT recognition provides: (1) Tax exemption under Section 80-IAC (3-year holiday in first 10 years), (2) Angel tax exemption, (3) Self-certification for 6 labor and 3 environment laws, (4) Fast-track patent examination, (5) 80% rebate on patent fees, (6) Government tender relaxations, (7) Fund of Funds access." },
  { category: "Startup", q: "What is angel tax and who is exempt?", a: "Angel tax (Section 56(2)(viib)) applies when unlisted companies receive shares premium above fair market value. DPIIT-recognized startups are exempt from angel tax. The Budget 2023 extended angel tax to foreign investments but startups with DPIIT recognition and CBDT specified investors remain exempt." },
];

const CATEGORIES = ["All", "GST", "Income Tax", "Company Law", "TDS", "Startup"];

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = FAQS.filter((f) => {
    const matchCat = category === "All" || f.category === category;
    const matchSearch = search === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="pt-20">
      <div className="bg-gradient-hero py-20 px-4 text-center">
        <h1 className="text-5xl font-black text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-white/80">Find answers to common tax and compliance questions</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-12 pr-4 py-4 text-base bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-[#2563EB] shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 flex-wrap mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                category === cat ? "bg-[#2563EB] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center text-slate-400 py-8">No FAQs found. Try a different search term.</p>
          ) : (
            filtered.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:border-slate-200 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-2 py-1 rounded-full flex-shrink-0 mt-0.5">
                      {faq.category}
                    </span>
                    <span className="font-semibold text-slate-900">{faq.q}</span>
                  </div>
                  {openIndex === i ? (
                    <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-gradient-to-br from-[#0F172A] to-[#1e3a8a] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-black mb-2">Still Have Questions?</h3>
          <p className="text-white/70 mb-6">
            Our CA team is available to answer any specific questions about your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/919876543210"
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0F172A] font-bold px-6 py-3 rounded-xl hover:bg-[#c4a030] transition-colors"
            >
              Chat on WhatsApp
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
            >
              Ask Your Question
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
