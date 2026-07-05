import Link from "next/link";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SERVICES: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}> = {
  "income-tax": {
    title: "Income Tax Filing",
    subtitle: "Accurate ITR filing for individuals, businesses & NRIs",
    description: "Our expert CAs ensure precise income tax return filing with maximum deductions. We handle ITR-1 through ITR-7 for all categories of taxpayers.",
    features: [
      "All ITR forms — ITR-1 to ITR-7",
      "Maximum deduction planning (80C, 80D, HRA, LTA)",
      "Capital gains computation (equity, property, debt)",
      "Business income with full P&L and balance sheet",
      "Foreign income and DTAA benefit claims",
      "Advance tax computation and payment tracking",
      "Response to income tax notices",
      "Carry forward of losses",
    ],
    process: [
      { step: "01", title: "Document Collection", desc: "Share Form 16, bank statements, investment proofs, and other income details securely." },
      { step: "02", title: "Income Computation", desc: "Our CA reviews all sources of income, calculates tax liability, and identifies eligible deductions." },
      { step: "03", title: "ITR Preparation", desc: "We prepare the ITR with accurate figures, ensuring compliance with all provisions." },
      { step: "04", title: "Review & E-File", desc: "You review the draft return. Once approved, we e-file and send you the acknowledgment." },
    ],
    faqs: [
      { q: "What is the ITR filing deadline?", a: "July 31 for non-audit cases and October 31 for businesses requiring tax audit." },
      { q: "What documents do I need?", a: "Form 16/16A, bank statements, investment proofs (80C), rent receipts (HRA), capital gains statements." },
    ],
  },
  "gst": {
    title: "GST Registration & Returns",
    subtitle: "End-to-end GST compliance management",
    description: "Complete GST services from registration to annual returns. We handle GSTR-1, GSTR-3B, GSTR-9, and all reconciliation work.",
    features: [
      "New GST registration (regular & composition)",
      "Monthly/quarterly GSTR-1 and GSTR-3B filing",
      "GSTR-9 annual return filing",
      "GSTR-9C reconciliation and certification",
      "ITC reconciliation and 2A/2B matching",
      "GST audit and health check",
      "E-way bill compliance",
      "GST notice handling and responses",
    ],
    process: [
      { step: "01", title: "Registration/Review", desc: "Apply for new registration or review existing setup for correct category and HSN codes." },
      { step: "02", title: "Data Collection", desc: "Sales/purchase invoices and expense data collected monthly." },
      { step: "03", title: "Return Filing", desc: "GSTR-1 and 3B filed on time with ITC reconciliation." },
      { step: "04", title: "Reconciliation", desc: "Annual GSTR-9/9C filing with books-to-GST reconciliation." },
    ],
    faqs: [
      { q: "When is GST registration required?", a: "When annual turnover exceeds ₹40L (goods) or ₹20L (services). Also mandatory for inter-state supply and e-commerce." },
      { q: "What are the GST return due dates?", a: "GSTR-1: 11th of next month. GSTR-3B: 20th of next month. Annual (GSTR-9): 31st December." },
    ],
  },
  "roc": {
    title: "ROC Compliance",
    subtitle: "Complete MCA filings and company law compliance",
    description: "Timely and accurate ROC filings to keep your company in good standing with the Ministry of Corporate Affairs.",
    features: [
      "Annual return (MGT-7/MGT-7A) filing",
      "Financial statements (AOC-4) filing",
      "Director KYC (DIR-3 KYC)",
      "Board meetings and resolutions",
      "Change in directors/shareholders",
      "Share allotment and transfer filings",
      "Increase in authorized capital",
      "Company name and object change",
    ],
    process: [
      { step: "01", title: "Compliance Calendar", desc: "We maintain a calendar of all ROC due dates for your company." },
      { step: "02", title: "Document Preparation", desc: "Board resolutions, financial statements, and MCA forms prepared accurately." },
      { step: "03", title: "Filing", desc: "All forms filed on MCA portal within due dates." },
      { step: "04", title: "Confirmation", desc: "SRN receipts and MCA acknowledgments shared with you." },
    ],
    faqs: [
      { q: "What are the penalty for late ROC filings?", a: "₹200/day per form with no upper limit. Annual return can attract additional penalties on non-compliance." },
      { q: "When is AGM required?", a: "Within 6 months of financial year end (by September 30 each year) for private limited companies." },
    ],
  },
  "audit": {
    title: "Audit & Assurance",
    subtitle: "Independent and accurate audit services",
    description: "Statutory, tax, and internal audits conducted by qualified CAs ensuring financial accuracy and regulatory compliance.",
    features: [
      "Statutory audit for companies (Pvt Ltd, Public Ltd)",
      "Tax audit under Section 44AB",
      "Internal audit and process review",
      "Stock audit and concurrent audit",
      "GST audit and 9C certification",
      "Bank audit (concurrent/statutory)",
      "NGO/Section 8 company audit",
      "Transfer pricing documentation",
    ],
    process: [
      { step: "01", title: "Planning", desc: "Understanding business, risk assessment, and audit scope definition." },
      { step: "02", title: "Fieldwork", desc: "Examination of books, vouchers, invoices, and supporting documents." },
      { step: "03", title: "Observations", desc: "Audit observations and management letter with recommendations." },
      { step: "04", title: "Report", desc: "Audit report issued with opinion on true and fair view." },
    ],
    faqs: [
      { q: "Who requires a tax audit?", a: "Businesses with turnover > ₹1 crore (₹10 crore if cash transactions < 5%). Professionals with receipts > ₹50 lakhs." },
      { q: "When must the audit report be filed?", a: "By September 30 (extended to October 31 for companies)." },
    ],
  },
  "accounting": {
    title: "Accounting & Bookkeeping",
    subtitle: "Real-time cloud accounting and financial reporting",
    description: "Complete accounting services with monthly financial reports, helping you make data-driven business decisions.",
    features: [
      "Daily/weekly bookkeeping",
      "Accounts payable and receivable management",
      "Bank reconciliation statements",
      "Monthly P&L and balance sheet",
      "Cash flow statements",
      "MIS reports for management",
      "Fixed assets register maintenance",
      "Payroll processing and compliance",
    ],
    process: [
      { step: "01", title: "Setup", desc: "Chart of accounts, accounting software setup, and data migration." },
      { step: "02", title: "Transaction Recording", desc: "All invoices, payments, and receipts recorded accurately." },
      { step: "03", title: "Reconciliation", desc: "Monthly bank reconciliation and accounts review." },
      { step: "04", title: "Reporting", desc: "Monthly MIS reports delivered by the 5th of next month." },
    ],
    faqs: [
      { q: "Which accounting software do you use?", a: "We work with Tally, Zoho Books, QuickBooks, and SAP depending on client preference." },
      { q: "Can you handle multi-currency transactions?", a: "Yes, we handle multi-currency accounting for import/export businesses and foreign subsidiaries." },
    ],
  },
  "company-registration": {
    title: "Company Registration",
    subtitle: "Fast-track company incorporation in 5-7 days",
    description: "Complete company registration services — Pvt Ltd, LLP, OPC, Section 8, Producer Company — with post-incorporation compliance.",
    features: [
      "Private Limited Company incorporation",
      "LLP (Limited Liability Partnership) registration",
      "One Person Company (OPC)",
      "Section 8 (Non-Profit) Company",
      "Producer Company registration",
      "Foreign subsidiary registration",
      "DSC and DIN procurement",
      "MOA/AOA drafting",
    ],
    process: [
      { step: "01", title: "Consultation", desc: "Choose the right business structure based on your goals, investment, and compliance needs." },
      { step: "02", title: "Documentation", desc: "DSC procurement, DIN application, name reservation via RUN." },
      { step: "03", title: "MCA Filing", desc: "SPICe+ form filing with all incorporation documents." },
      { step: "04", title: "Certificate & Beyond", desc: "Certificate of Incorporation received + PAN, TAN, and bank account guidance." },
    ],
    faqs: [
      { q: "How long does registration take?", a: "Typically 5-7 working days from document submission to Certificate of Incorporation." },
      { q: "What is the minimum capital required?", a: "No minimum paid-up capital required for Private Limited or LLP companies in India." },
    ],
  },
  "startup": {
    title: "Startup Advisory",
    subtitle: "Expert guidance for founders and growing startups",
    description: "Comprehensive startup financial and compliance advisory — from incorporation to fundraising, DPIIT recognition to ESOPs.",
    features: [
      "DPIIT startup recognition",
      "Angel tax exemption filing",
      "ESOP structuring and valuation",
      "Venture capital due diligence support",
      "Term sheet review and negotiation",
      "Capitalization table management",
      "Startup-specific tax planning",
      "Convertible note and SAFE agreement review",
    ],
    process: [
      { step: "01", title: "Structuring", desc: "Choose optimal legal and tax structure for your startup from day one." },
      { step: "02", title: "Compliance Setup", desc: "GST, PF, ESI, professional tax, and all regulatory registrations." },
      { step: "03", title: "DPIIT Recognition", desc: "Apply for DPIIT recognition to unlock tax benefits and government schemes." },
      { step: "04", title: "Ongoing Advisory", desc: "Monthly CFO-as-a-Service for financial planning and investor reporting." },
    ],
    faqs: [
      { q: "What is angel tax exemption?", a: "DPIIT-recognized startups are exempt from angel tax (Section 56(2)(viib)) on share premium above fair market value." },
      { q: "What are the benefits of DPIIT recognition?", a: "3-year income tax holiday, angel tax exemption, fast-track patent examination, 80% patent fee rebate, and more." },
    ],
  },
  "nri": {
    title: "NRI Taxation",
    subtitle: "Expert tax services for Non-Resident Indians",
    description: "Specialized NRI taxation services covering Indian income, DTAA benefits, FEMA compliance, and repatriation of funds.",
    features: [
      "NRI status determination",
      "ITR filing for Indian income",
      "DTAA benefit claims",
      "Capital gains on Indian property",
      "NRE/NRO account advisory",
      "FEMA compliance for investments",
      "Repatriation of funds from India",
      "Form 15CA/CB certification",
    ],
    process: [
      { step: "01", title: "Residency Check", desc: "Determine NRI/RNOR/Resident status based on days of stay and FEMA rules." },
      { step: "02", title: "Income Review", desc: "Identify all Indian-source income — rent, dividends, capital gains, salary." },
      { step: "03", title: "Tax Optimization", desc: "Apply DTAA benefits and eligible deductions to minimize Indian tax." },
      { step: "04", title: "ITR & Compliance", desc: "File ITR and obtain any refunds. Handle Form 15CA/CB for remittances." },
    ],
    faqs: [
      { q: "Do NRIs need to file ITR in India?", a: "Yes, if Indian income exceeds ₹2.5 lakhs (basic exemption limit). Also required for capital gains and to claim refunds." },
      { q: "What is Form 15CA/CB?", a: "Required for remitting money outside India. Form 15CA is filed online; Form 15CB is a CA certificate needed for certain remittances." },
    ],
  },
  "consulting": {
    title: "Business Consulting",
    subtitle: "Strategic financial advisory for growth",
    description: "Beyond compliance — strategic CFO-level advisory to help you grow profitably, manage cash flow, and make sound financial decisions.",
    features: [
      "Financial modeling and projections",
      "Business valuation",
      "Merger & acquisition advisory",
      "Cash flow management",
      "Profitability analysis",
      "Working capital optimization",
      "Business restructuring",
      "Management reporting and KPIs",
    ],
    process: [
      { step: "01", title: "Business Review", desc: "Deep dive into your financials, operations, and growth goals." },
      { step: "02", title: "Analysis", desc: "Identify bottlenecks, opportunities, and financial risks." },
      { step: "03", title: "Strategy", desc: "Actionable roadmap for growth, cost optimization, and compliance." },
      { step: "04", title: "Implementation", desc: "Ongoing monthly advisory and performance tracking." },
    ],
    faqs: [
      { q: "What is CFO-as-a-Service?", a: "A fractional CFO who handles all financial strategy, reporting, and fundraising support at a fraction of a full-time CFO cost." },
      { q: "Do you help with fundraising?", a: "Yes — financial projections, pitch deck financials, due diligence, investor Q&A support." },
    ],
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | TaxPro CA Firm`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES[slug];
  if (!service) notFound();

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-hero py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            CA Services
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{service.title}</h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl">{service.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold px-8 h-14 bg-[#D4AF37] text-[#0F172A] hover:bg-[#c4a030] shadow-lg transition-all"
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold px-8 h-14 bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-[#0F172A] transition-all"
            >
              <Phone className="h-5 w-5" /> Call Now
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            <div>
              <h2 className="text-2xl font-black text-[#0F172A] mb-6">What's Included</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {service.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl font-black text-[#0F172A] mb-6">Our Process</h2>
              <div className="space-y-4">
                {service.process.map((step, i) => (
                  <div key={i} className="flex gap-5 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white font-black text-sm flex items-center justify-center flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-500 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-black text-[#0F172A] mb-6">Common Questions</h2>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600 text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1e3a8a] rounded-2xl p-6 text-white sticky top-24">
              <h3 className="text-xl font-black mb-2">Get a Free Quote</h3>
              <p className="text-white/70 text-sm mb-6">
                Talk to our CA and get a custom quote within 2 hours.
              </p>
              <div className="space-y-3">
                <Link 
                  href="/contact"
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold w-full px-4 py-3 bg-[#D4AF37] text-[#0F172A] hover:bg-[#c4a030] transition-all"
                >
                  Book Free Consultation
                </Link>
                <a href="https://wa.me/919876543210" className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/20 text-white text-sm font-medium py-3 rounded-xl hover:bg-white/20 transition-colors">
                  Chat on WhatsApp
                </a>
                <a href="tel:+919876543210" className="flex items-center justify-center gap-2 w-full bg-white/10 border border-white/20 text-white text-sm font-medium py-3 rounded-xl hover:bg-white/20 transition-colors">
                  <Phone className="h-4 w-4" /> +91 98765 43210
                </a>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs text-white/50">
                <p>✓ Free initial consultation</p>
                <p>✓ No hidden charges</p>
                <p>✓ Dedicated CA assigned</p>
                <p>✓ Response within 2 hours</p>
              </div>
            </div>

            {/* Related Services */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900 mb-4">Related Services</h3>
              <div className="space-y-2">
                {Object.entries(SERVICES)
                  .filter(([serviceSlug]) => serviceSlug !== slug)
                  .slice(0, 4)
                  .map(([serviceSlug, svc]) => (
                    <Link
                      key={serviceSlug}
                      href={`/services/${serviceSlug}`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <span className="text-sm text-slate-700 group-hover:text-[#2563EB]">{svc.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#2563EB]" />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
