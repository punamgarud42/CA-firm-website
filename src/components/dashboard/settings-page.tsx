"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Building2, Lock, Bell, Shield, Save } from "lucide-react";
import { updateProfile, updateClientProfile } from "@/actions/settings";
import { useToast } from "@/components/ui/toast-provider";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building2 },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export function SettingsPage({ user, clientProfile }: { user: any; clientProfile: any }) {
  const { toast } = useToast();
  const [tab, setTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.append("userId", user.id);
    const res = await updateProfile(fd);
    setLoading(false);
    toast({ title: res.success ? "Profile updated!" : "Update failed", variant: res.success ? "success" : "error", description: res.error });
  }

  async function handleCompanySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!clientProfile) return;
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.append("clientId", clientProfile.id);
    const res = await updateClientProfile(fd);
    setLoading(false);
    toast({ title: res.success ? "Company updated!" : "Update failed", variant: res.success ? "success" : "error" });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account preferences and company details</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0">
          <nav className="space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => {
              if (id === "company" && !clientProfile) return null;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left",
                    tab === id ? "bg-[#0F172A] text-white" : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {tab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white text-xl font-black">
                      {(user?.name ?? "U")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{user?.name}</p>
                      <p className="text-sm text-slate-500">{user?.role?.replace("_", " ")}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Full Name" name="name" defaultValue={user?.name ?? ""} required />
                    <Input label="Email Address" name="email" type="email" defaultValue={user?.email ?? ""} required />
                    <Input label="Phone Number" name="phone" type="tel" defaultValue={user?.phone ?? ""} />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" loading={loading}>
                      <Save className="h-4 w-4" /> Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {tab === "company" && clientProfile && (
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCompanySubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Company Name" name="companyName" defaultValue={clientProfile.companyName ?? ""} required />
                    <Input label="GST Number" name="gstNumber" defaultValue={clientProfile.gstNumber ?? ""} placeholder="22AAAAA0000A1Z5" />
                    <Input label="PAN Number" name="panNumber" defaultValue={clientProfile.panNumber ?? ""} placeholder="AAAAA0000A" />
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Industry</label>
                      <select
                        name="industry"
                        defaultValue={clientProfile.industry ?? ""}
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      >
                        <option value="">Select Industry</option>
                        {["Technology", "Manufacturing", "Healthcare", "Real Estate", "E-Commerce", "Finance", "Education", "Retail", "Other"].map((i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <Input label="Address" name="address" defaultValue={clientProfile.address ?? ""} />
                    </div>
                    <Input label="City" name="city" defaultValue={clientProfile.city ?? ""} />
                    <Input label="State" name="state" defaultValue={clientProfile.state ?? ""} />
                    <Input label="Pincode" name="pincode" defaultValue={clientProfile.pincode ?? ""} />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" loading={loading}>
                      <Save className="h-4 w-4" /> Save Company Details
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {tab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Change Password</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {user?.passwordHash ? "Update your account password." : "You signed in with Google. Password change is not available."}
                  </p>
                  {user?.passwordHash !== null && (
                    <div className="space-y-3 max-w-md">
                      <Input label="Current Password" type="password" name="currentPassword" />
                      <Input label="New Password" type="password" name="newPassword" />
                      <Input label="Confirm New Password" type="password" name="confirmPassword" />
                      <Button variant="primary">Update Password</Button>
                    </div>
                  )}
                </div>
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" /> Security Status
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Email verified", status: true },
                      { label: "Two-factor authentication", status: false },
                      { label: "Active sessions", status: true },
                    ].map(({ label, status }) => (
                      <div key={label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                        <span className="text-sm text-slate-700">{label}</span>
                        <span className={cn("text-xs font-semibold", status ? "text-green-600" : "text-slate-400")}>
                          {status ? "✓ Enabled" : "Not set up"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Compliance due date reminders", sub: "7 days before due date", default: true },
                    { label: "New message notifications", sub: "When your CA sends a message", default: true },
                    { label: "Invoice notifications", sub: "When a new invoice is created", default: true },
                    { label: "Appointment reminders", sub: "24 hours before scheduled meeting", default: true },
                    { label: "Document upload confirmation", sub: "When documents are uploaded", default: false },
                    { label: "Newsletter & tax updates", sub: "Weekly tax tips and updates", default: false },
                  ].map(({ label, sub, default: checked }) => (
                    <div key={label} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{label}</p>
                        <p className="text-xs text-slate-500">{sub}</p>
                      </div>
                      <div
                        className={cn(
                          "w-10 h-6 rounded-full relative cursor-pointer transition-colors",
                          checked ? "bg-[#2563EB]" : "bg-slate-200"
                        )}
                      >
                        <div className={cn(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform shadow-sm",
                          checked ? "translate-x-5" : "translate-x-1"
                        )} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="primary">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
