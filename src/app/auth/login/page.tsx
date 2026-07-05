"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/dashboard");
    }
  }

  async function handleGoogle() {
    setLoading(true);
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl" />
        </div>
        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] flex items-center justify-center">
              <span className="text-[#0F172A] font-black">CA</span>
            </div>
            <span className="text-white font-black text-xl">TaxPro</span>
          </Link>
        </div>
        <div className="relative">
          <h2 className="text-4xl font-black text-white mb-4">
            Your Secure<br />Client Portal
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Access your compliance dashboard, documents, invoices, and chat with your assigned CA — all in one place.
          </p>
          <div className="space-y-3">
            {[
              "Real-time compliance tracking",
              "Secure document vault",
              "Direct CA communication",
              "Invoice & payment history",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-white/40 text-sm">
          © {new Date().getFullYear()} TaxPro CA Firm
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center">
              <span className="text-[#D4AF37] font-black text-sm">CA</span>
            </div>
            <span className="font-black text-[#0F172A] text-lg">TaxPro</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#0F172A] mb-1">Welcome back</h1>
            <p className="text-slate-500">Sign in to your client portal</p>
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 rounded-xl py-3 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all mb-6"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#F8FAFC] px-4 text-sm text-slate-400">or sign in with email</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-4 w-4" />}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-9 text-slate-400 hover:text-slate-700"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-[#2563EB] hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="default" size="default" className="w-full" loading={loading}>
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            New client?{" "}
            <Link href="/contact" className="text-[#2563EB] font-semibold hover:underline">
              Register your business
            </Link>
          </p>

          {/* Security note */}
          <div className="mt-8 flex items-center gap-2 text-xs text-slate-400 justify-center">
            <Shield className="h-3.5 w-3.5" />
            256-bit SSL encrypted · SOC 2 compliant
          </div>
        </div>
      </div>
    </div>
  );
}
