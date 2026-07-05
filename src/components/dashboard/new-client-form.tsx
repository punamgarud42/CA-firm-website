"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, ArrowLeft } from "lucide-react";
import { createClient } from "@/actions/clients";
import { useToast } from "@/components/ui/toast-provider";
import Link from "next/link";

export function NewClientForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await createClient(fd);
    setLoading(false);

    if (res.success) {
      toast({ title: "Client created!", description: "Portal access has been set up.", variant: "success" });
      router.push("/dashboard/clients");
    } else {
      toast({ title: "Failed to create client", description: res.error, variant: "error" });
    }
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/clients" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="h-4 w-4" /> Back to Clients
      </Link>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Account */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Account Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Full Name *" name="name" placeholder="Rajesh Sharma" required />
                <Input label="Email Address *" name="email" type="email" placeholder="rajesh@company.com" required />
                <Input label="Phone Number" name="phone" type="tel" placeholder="+91 98765 43210" />
                <Input label="Temporary Password *" name="password" type="password" placeholder="Min 8 characters" required />
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Company Details */}
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Company Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Company Name *" name="companyName" placeholder="ABC Pvt Ltd" required />
                <Input label="GST Number" name="gstNumber" placeholder="22AAAAA0000A1Z5" />
                <Input label="PAN Number" name="panNumber" placeholder="AAAAA0000A" />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Industry</label>
                  <select
                    name="industry"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="">Select Industry</option>
                    {["Technology", "Manufacturing", "Healthcare", "Real Estate", "E-Commerce", "Finance", "Education", "Retail", "Professional Services", "Other"].map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Input label="Address" name="address" placeholder="Street address" />
                </div>
                <Input label="City" name="city" placeholder="Mumbai" />
                <Input label="State" name="state" placeholder="Maharashtra" />
                <Input label="Pincode" name="pincode" placeholder="400001" />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <Button type="button" variant="ghost" asChild>
                <Link href="/dashboard/clients">Cancel</Link>
              </Button>
              <Button type="submit" variant="primary" loading={loading}>
                <UserPlus className="h-4 w-4" /> Create Client
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
