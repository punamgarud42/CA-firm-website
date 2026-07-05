"use server";
import { auth } from "@/lib/auth";

const FALLBACK_ANSWERS: Record<string, string> = {
  gst: `**GST (Goods and Services Tax) Key Information:**

• **GSTR-1** (Outward supplies): Due by 11th of next month (monthly) or 13th (quarterly)
• **GSTR-3B** (Monthly summary): Due by 20th of next month
• **GSTR-9** (Annual return): Due by 31st December
• **GST Registration** required if turnover > ₹40 lakhs (goods) / ₹20 lakhs (services)
• **Composition Scheme**: Available for businesses with turnover up to ₹1.5 crore

Need help with a specific GST query? Please ask!`,

  income_tax: `**Income Tax Key Information:**

• **ITR Filing Deadline**: 31st July (non-audit cases), 31st October (audit cases)
• **Advance Tax**: Payable in 4 installments — 15% by June 15, 45% by Sept 15, 75% by Dec 15, 100% by March 15
• **Section 80C**: Deductions up to ₹1.5 lakh (PPF, ELSS, LIC, home loan principal)
• **Section 80D**: Health insurance premium deduction up to ₹25,000 (₹50,000 for senior citizens)
• **HRA Exemption**: Minimum of (a) actual HRA, (b) 50%/40% of salary, (c) rent paid minus 10% salary

Ask me about specific deductions or filing requirements!`,

  tds: `**TDS (Tax Deducted at Source) Key Dates:**

• **Monthly TDS deposit**: 7th of the following month
• **March TDS**: Due by 30th April
• **TDS Return (Form 26Q/24Q)**: Quarterly — 31st July, 31st Oct, 31st Jan, 31st May
• **TDS Certificate**: Form 16 (salary) by June 15, Form 16A (others) within 15 days of return filing
• **TDS on rent**: 10% if annual rent > ₹2.4 lakhs (section 194I)
• **TDS on professional fees**: 10% (section 194J)`,

  roc: `**ROC Compliance Key Filings:**

• **Annual Return (MGT-7)**: Within 60 days of AGM
• **Financial Statements (AOC-4)**: Within 30 days of AGM
• **Director KYC (DIR-3 KYC)**: 30th September annually
• **ADT-1** (Auditor appointment): Within 15 days of AGM
• **AGM**: Within 6 months of financial year end (by 30th September)
• **Penalty**: ₹200/day for late filing (minimum ₹1,000)`,

  company: `**Company Registration Process:**

**Private Limited Company:**
1. Obtain DSC (Digital Signature Certificate) for directors
2. Apply for DIN (Director Identification Number)
3. Name approval via RUN (Reserve Unique Name)
4. File SPICe+ form with MCA
5. Get Certificate of Incorporation
6. Open current account

**Documents Required:**
• PAN and Aadhaar of all directors
• Address proof (utility bill)
• Passport-size photographs
• Registered office proof

**Timeline**: 5-7 working days typically
**Government fees**: ₹1,000 – ₹5,000 depending on authorized capital`,
};

function getRelevantAnswer(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("gst") || q.includes("goods and service")) return FALLBACK_ANSWERS.gst;
  if (q.includes("income tax") || q.includes("itr") || q.includes("hra") || q.includes("80c") || q.includes("advance tax")) return FALLBACK_ANSWERS.income_tax;
  if (q.includes("tds") || q.includes("tax deducted") || q.includes("form 26q")) return FALLBACK_ANSWERS.tds;
  if (q.includes("roc") || q.includes("company annual") || q.includes("mgt-7") || q.includes("aoc-4")) return FALLBACK_ANSWERS.roc;
  if (q.includes("company registration") || q.includes("incorporate") || q.includes("pvt ltd") || q.includes("llp")) return FALLBACK_ANSWERS.company;

  return `Thank you for your question about: **"${question}"**

Based on Indian tax laws and compliance requirements, here are the key points to consider:

1. **Consult your assigned CA** for specific advice tailored to your business situation
2. **Keep all documents ready** — PAN, GST registration, financial statements
3. **Stay updated** with CBIC and MCA circulars for the latest changes
4. **Maintain timely compliance** to avoid penalties and interest

**Common due dates to remember:**
• GST Returns: 11th / 20th of each month
• TDS Deposit: 7th of each month
• Advance Tax: March 15 (final installment)
• ITR Filing: July 31 (non-audit) / October 31 (audit)

Would you like me to elaborate on any specific aspect? I'm here to help!

*For professional advice specific to your situation, please chat with your assigned CA through the Messages section.*`;
}

export async function askAIAssistant(question: string) {
  const session = await auth();
  if (!session) return { answer: "Please log in to use the AI Assistant." };

  // Try OpenAI if key is available
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are an expert Indian CA (Chartered Accountant) assistant for TaxPro CA Firm.
You answer questions about Indian taxation (GST, Income Tax, TDS, ROC compliance, company law).
Be concise, accurate, and cite relevant sections/forms where applicable.
Format responses with bold headers and bullet points.
Always note: "For professional advice specific to your situation, consult your assigned CA."
Do NOT answer questions unrelated to Indian taxation and business compliance.`,
            },
            { role: "user", content: question },
          ],
          max_tokens: 800,
          temperature: 0.3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { answer: data.choices[0]?.message?.content ?? getRelevantAnswer(question) };
      }
    } catch {
      // Fall through to built-in answers
    }
  }

  // Use built-in knowledge base
  return { answer: getRelevantAnswer(question) };
}
