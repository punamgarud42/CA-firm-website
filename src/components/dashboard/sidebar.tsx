"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
  LayoutDashboard, FileText, CheckSquare, Calendar, MessageSquare,
  CreditCard, Settings, LogOut, Users, Shield, BarChart2,
  UserPlus, BookOpen, Bell, Building2, ChevronRight, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
};

const clientNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Compliance", href: "/dashboard/compliance", icon: Shield },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare, badge: 3 },
  { label: "Invoices", href: "/dashboard/invoices", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const staffNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Clients", href: "/dashboard/clients", icon: Users },
  { label: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Compliance", href: "/dashboard/compliance", icon: Shield },
  { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Reports", href: "/dashboard/reports", icon: BarChart2 },
];

const adminNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Staff", href: "/dashboard/staff", icon: UserPlus },
  { label: "Leads", href: "/dashboard/leads", icon: UserPlus },
  { label: "Compliance", href: "/dashboard/compliance", icon: Shield },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "Invoices", href: "/dashboard/invoices", icon: CreditCard },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
  { label: "Blog & CMS", href: "/dashboard/cms", icon: BookOpen },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function getNav(role: string) {
  if (role === "SUPER_ADMIN") return adminNav;
  if (role === "CA_STAFF") return staffNav;
  return clientNav;
}

export function DashboardSidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const navItems = getNav(role);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center">
            <span className="text-[#0F172A] font-black text-xs">CA</span>
          </div>
          <div>
            <span className="text-white font-black text-sm">TaxPro</span>
            <span className="block text-white/40 text-xs leading-none">
              {role === "SUPER_ADMIN" ? "Admin Panel" : role === "CA_STAFF" ? "Staff Portal" : "Client Portal"}
            </span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className={cn("h-4.5 w-4.5", active ? "text-white" : "text-white/50")} />
                <span className="flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="bg-[#D4AF37] text-[#0F172A] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
                {active && <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => {
            setMobileOpen(false);
            signOut({ callbackUrl: "/" });
          }}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-red-500/20 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0F172A] flex-col h-screen flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Menu Button & Drawer */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-[#0F172A] text-white hover:bg-[#0F172A]/90 transition-colors"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "md:hidden fixed top-0 left-0 w-64 bg-[#0F172A] flex flex-col h-screen flex-shrink-0 z-40 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
