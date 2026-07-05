import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl font-black text-[#0F172A]/10 mb-4 leading-none">404</div>
        <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-[#D4AF37] font-black text-lg">CA</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Page not found</h1>
        <p className="text-slate-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" asChild>
            <Link href="/"><Home className="h-4 w-4" /> Go to Homepage</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
