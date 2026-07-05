"use client";
import { Bell, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeaderUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export function DashboardHeader({ user }: { user: HeaderUser }) {
  const [dropOpen, setDropOpen] = useState(false);

  const getInitials = (name?: string | null) =>
    (name ?? "U").split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const roleLabel = user.role === "SUPER_ADMIN" ? "Administrator" : user.role === "CA_STAFF" ? "CA Staff" : "Client";

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center px-6 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white text-xs font-bold">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" className="w-8 h-8 rounded-xl object-cover" />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold text-slate-900 leading-none">{user.name ?? "User"}</div>
              <div className="text-xs text-slate-500 leading-none mt-0.5">{roleLabel}</div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {dropOpen && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setDropOpen(false)}
              >
                Profile Settings
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
