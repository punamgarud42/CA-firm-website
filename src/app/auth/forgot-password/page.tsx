"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // In production: call password reset API
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center">
            <span className="text-[#D4AF37] font-black text-sm">CA</span>
          </div>
          <span className="font-black text-[#0F172A] text-lg">TaxPro</span>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-8 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">Check your email</h2>
            <p className="text-slate-500 mb-6 text-sm">
              If an account exists for <strong>{email}</strong>, we've sent a password reset link.
              Check your inbox and spam folder.
            </p>
            <Link href="/auth/login" className="text-[#2563EB] font-semibold text-sm hover:underline">
              Back to Sign In
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-8">
            <Link href="/auth/login" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Sign In
            </Link>
            <h1 className="text-2xl font-black text-slate-900 mb-1">Forgot password?</h1>
            <p className="text-slate-500 text-sm mb-6">
              Enter your email and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4" />}
                required
              />
              <Button type="submit" variant="primary" className="w-full" loading={loading}>
                Send Reset Link
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
