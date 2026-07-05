import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TaxPro CA Firm",
  description: "Read TaxPro CA Firm's privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us when you:
• Create an account or register as a client
• Submit contact forms or consultation requests
• Upload documents through our client portal
• Communicate with our CA team

Types of information collected:
• Personal identification (name, email, phone, PAN, GST number)
• Company information (company name, address, financial data)
• Documents uploaded to our portal (financial statements, tax documents)
• Usage data (pages visited, features used, login timestamps)`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use your information to:
• Provide chartered accountancy services and compliance management
• Send compliance reminders and deadline alerts
• Process invoices and payments
• Communicate about your account and services
• Improve our platform and services
• Comply with legal and regulatory obligations

We never sell your personal information to third parties.`,
    },
    {
      title: "3. Data Security",
      content: `We implement enterprise-grade security measures:
• 256-bit SSL encryption for all data transmission
• AES-256 encryption for stored documents
• Role-based access control (RBAC) — only your assigned CA accesses your data
• Regular security audits and penetration testing
• Two-factor authentication for all staff accounts
• SOC 2 Type II compliant infrastructure via Supabase

Financial documents are stored in isolated, encrypted storage buckets with strict access policies.`,
    },
    {
      title: "4. Data Sharing",
      content: `We share data only in limited circumstances:
• With your assigned CA professional for service delivery
• With Supabase (our infrastructure provider) under strict data processing agreements
• With Resend (email service) for transactional notifications only
• When required by law, court order, or regulatory authority (ICAI, IT Department, etc.)
• With your explicit written consent

We do not share your data with advertisers, data brokers, or marketing companies.`,
    },
    {
      title: "5. Document Retention",
      content: `We retain your data in accordance with:
• ICAI guidelines requiring CA firms to retain client records for 7 years
• Income Tax Act requirements for tax-related documents
• GST Act requirements for GST filings and records

You may request deletion of non-statutory data by contacting us. Statutory records are retained as required by law.`,
    },
    {
      title: "6. Your Rights",
      content: `Under applicable data protection laws, you have the right to:
• Access your personal data held by us
• Correct inaccurate personal data
• Request deletion of non-statutory personal data
• Export your data in portable format
• Withdraw consent for non-essential data processing
• Lodge a complaint with the data protection authority

To exercise these rights, email: privacy@taxpro.in`,
    },
    {
      title: "7. Cookies",
      content: `We use essential cookies for:
• Authentication and session management
• Security (CSRF protection)
• User preferences

We do not use advertising cookies or cross-site tracking cookies. You may disable cookies in your browser settings, but this may affect functionality.`,
    },
    {
      title: "8. Changes to This Policy",
      content: `We may update this Privacy Policy periodically. Significant changes will be notified via:
• Email to all registered users
• In-app notification in the client portal
• Notice on our website homepage

Continued use of our services after notification constitutes acceptance of the updated policy.`,
    },
  ];

  return (
    <div className="pt-20">
      <div className="bg-gradient-hero py-16 px-4 text-center">
        <h1 className="text-4xl font-black text-white mb-3">Privacy Policy</h1>
        <p className="text-white/70">Last updated: January 1, 2025</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <p className="text-blue-800 text-sm leading-relaxed">
            <strong>Summary:</strong> TaxPro CA Firm collects only the data needed to deliver CA services.
            We never sell your data. All documents are encrypted. Your assigned CA is the only person
            with access to your financial information. Contact us at{" "}
            <a href="mailto:privacy@taxpro.in" className="underline font-medium">privacy@taxpro.in</a>{" "}
            for any privacy concerns.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-black text-[#0F172A] mb-3">{section.title}</h2>
              <div className="prose prose-slate max-w-none">
                {section.content.split("\n").map((line, i) =>
                  line.startsWith("•") ? (
                    <p key={i} className="text-slate-600 text-sm leading-relaxed ml-4">{line}</p>
                  ) : (
                    <p key={i} className="text-slate-600 text-sm leading-relaxed">{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-2">Contact Us About Privacy</h3>
          <p className="text-slate-600 text-sm mb-3">
            For privacy-related questions, data requests, or concerns:
          </p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Email: <a href="mailto:privacy@taxpro.in" className="text-[#2563EB] hover:underline">privacy@taxpro.in</a></p>
            <p>Address: 123, Business Hub, BKC, Mumbai – 400051</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
      </div>
    </div>
  );
}
