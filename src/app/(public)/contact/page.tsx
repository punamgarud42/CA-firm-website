import { ContactPage } from "@/components/website/contact-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Book Free Consultation",
  description: "Get in touch with TaxPro CA Firm. Book a free consultation, call us, or visit our office.",
};

export default function Contact() {
  return <ContactPage />;
}
