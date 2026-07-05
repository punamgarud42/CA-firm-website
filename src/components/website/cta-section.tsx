import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/20 rounded-full filter blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          Get Started Today
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
          Ready to Simplify Your{" "}
          <span className="text-[#D4AF37]">Tax & Compliance?</span>
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Join 1000+ businesses who trust TaxPro for their financial compliance.
          Book your free consultation today — no commitment required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gold" size="xl" asChild>
            <Link href="/contact">
              Book Free Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            size="xl"
            className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-[#0F172A]"
            asChild
          >
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </Button>
          <Button
            size="xl"
            className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-[#0F172A]"
            asChild
          >
            <a href="tel:+919876543210">
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </Button>
        </div>

        <p className="mt-8 text-white/50 text-sm">
          ✓ Free initial consultation &nbsp;·&nbsp; ✓ No hidden charges &nbsp;·&nbsp; ✓ Response within 2 hours
        </p>
      </div>
    </section>
  );
}
