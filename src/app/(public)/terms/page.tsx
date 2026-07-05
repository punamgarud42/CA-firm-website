import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TaxPro CA Firm",
  description: "TaxPro CA Firm's terms of service — understand your rights and obligations.",
};

export default function TermsPage() {
  return (
    <div className="pt-20">
      <div className="bg-gradient-hero py-16 px-4 text-center">
        <h1 className="text-4xl font-black text-white mb-3">Terms of Service</h1>
        <p className="text-white/70">Last updated: January 1, 2025</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8">
        {[
          {
            title: "1. Acceptance of Terms",
            body: "By accessing or using the TaxPro CA Firm platform ('Service'), you agree to be bound by these Terms of Service. If you disagree with any part, you may not access the Service. These terms apply to all visitors, users, and clients.",
          },
          {
            title: "2. Description of Services",
            body: "TaxPro CA Firm provides chartered accountancy services including income tax filing, GST compliance, ROC filings, audit services, and business advisory through our platform. Services are delivered by qualified Chartered Accountants registered with ICAI.",
          },
          {
            title: "3. Client Responsibilities",
            body: "Clients are responsible for:\n• Providing accurate, complete, and timely information\n• Uploading correct documents before deadlines\n• Reviewing and approving filings before submission\n• Making timely payment of government fees and our service charges\n• Notifying us promptly of any changes in business circumstances\n\nTaxPro is not liable for penalties arising from inaccurate information provided by clients.",
          },
          {
            title: "4. Fees and Payment",
            body: "Service fees are as agreed in the engagement letter. Payment is due within the period specified on the invoice. Late payments attract 18% per annum interest. Government fees, stamp duties, and filing charges are payable separately and are the client's responsibility.",
          },
          {
            title: "5. Confidentiality",
            body: "Both parties agree to maintain strict confidentiality of all information shared. TaxPro follows ICAI Code of Ethics on client confidentiality. Client data is never shared with third parties except as required by law or with client consent.",
          },
          {
            title: "6. Limitation of Liability",
            body: "TaxPro's liability is limited to the fees paid for the specific service in question. We are not liable for:\n• Indirect, incidental, or consequential damages\n• Penalties resulting from government policy changes after filing\n• Delays caused by government system downtime (MCA, GSTN, Income Tax portal)\n• Losses resulting from client failure to provide timely information",
          },
          {
            title: "7. Intellectual Property",
            body: "All platform content, software, and materials are owned by TaxPro CA Firm. Client documents remain the property of the client. TaxPro retains the right to use anonymized, aggregated data for platform improvement.",
          },
          {
            title: "8. Termination",
            body: "Either party may terminate the engagement with 30 days written notice. Upon termination, we will provide all client documents. Outstanding fees remain payable. Statutory obligations that have already been accepted will be completed.",
          },
          {
            title: "9. Governing Law",
            body: "These terms are governed by Indian law. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra. We encourage resolution through mutual discussion before legal recourse.",
          },
          {
            title: "10. Contact",
            body: "For questions about these terms:\nEmail: legal@taxpro.in\nPhone: +91 98765 43210\nAddress: 123, Business Hub, BKC, Mumbai – 400051",
          },
        ].map(({ title, body }) => (
          <div key={title}>
            <h2 className="text-xl font-black text-[#0F172A] mb-3">{title}</h2>
            <div className="space-y-1.5">
              {body.split("\n").map((line, i) => (
                <p key={i} className={`text-slate-600 text-sm leading-relaxed ${line.startsWith("•") ? "ml-4" : ""}`}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
