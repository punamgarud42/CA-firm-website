import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "TaxPro CA Firm | Expert Tax, Audit & Compliance Solutions",
    template: "%s | TaxPro CA Firm",
  },
  description:
    "Expert Chartered Accountant services for businesses, startups and individuals. Income Tax, GST, ROC Compliance, Audit & more. 1000+ satisfied clients.",
  keywords: [
    "CA firm", "chartered accountant", "income tax filing",
    "GST registration", "ROC compliance", "audit services",
    "company registration", "tax planning", "business consulting",
  ],
  authors: [{ name: "TaxPro CA Firm" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "TaxPro CA Firm | Expert Tax, Audit & Compliance Solutions",
    description: "Expert CA services for growing businesses.",
    siteName: "TaxPro CA Firm",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaxPro CA Firm",
    description: "Expert Tax, Audit & Compliance Solutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
