"use client";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, AlertCircle, DollarSign, UserPlus, BarChart2, ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

interface AdminStats {
  totalClients: number;
  activeLeads: number;
  pendingCompliance: number;
  monthlyRevenue: number;
}

const revenueData = [
  { month: "Jul", revenue: 420000 },
  { month: "Aug", revenue: 380000 },
  { month: "Sep", revenue: 560000 },
  { month: "Oct", revenue: 490000 },
  { month: "Nov", revenue: 620000 },
  { month: "Dec", revenue: 580000 },
  { month: "Jan", revenue: 740000 },
];

const clientGrowth = [
  { month: "Jul", clients: 820 },
  { month: "Aug", clients: 860 },
  { month: "Sep", clients: 900 },
  { month: "Oct", clients: 940 },
  { month: "Nov", clients: 980 },
  { month: "Dec", clients: 990 },
  { month: "Jan", clients: 1020 },
];

const complianceData = [
  { name: "Completed", value: 68, color: "#22c55e" },
  { name: "In Progress", value: 20, color: "#3b82f6" },
  { name: "Pending", value: 8, color: "#f59e0b" },
  { name: "Overdue", value: 4, color: "#ef4444" },
];

export function AdminDashboard({ stats }: { stats: AdminStats }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of all operations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/reports">
              <BarChart2 className="h-4 w-4" /> Reports
            </Link>
          </Button>
          <Button variant="primary" size="sm" asChild>
            <Link href="/dashboard/clients/new">
              <UserPlus className="h-4 w-4" /> Add Client
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Users, label: "Total Clients", value: stats.totalClients.toLocaleString("en-IN"),
            sub: "+12 this month", color: "bg-blue-50 text-blue-600", trend: "+8%"
          },
          {
            icon: UserPlus, label: "Active Leads", value: stats.activeLeads.toLocaleString("en-IN"),
            sub: "Need follow-up", color: "bg-amber-50 text-amber-600", trend: "+15%"
          },
          {
            icon: AlertCircle, label: "Pending Compliance", value: stats.pendingCompliance.toLocaleString("en-IN"),
            sub: "Requires action", color: "bg-red-50 text-red-600", trend: "-3%"
          },
          {
            icon: DollarSign, label: "Monthly Revenue", value: formatCurrency(stats.monthlyRevenue),
            sub: "This month", color: "bg-green-50 text-green-600", trend: "+22%"
          },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${kpi.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />{kpi.trend}
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-900">{kpi.value}</p>
                <p className="text-sm font-medium text-slate-600 mt-0.5">{kpi.label}</p>
                <p className="text-xs text-slate-400">{kpi.sub}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Revenue Growth</CardTitle>
            <span className="text-xs text-slate-400">Last 7 months</span>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(v: any) => [`₹${(v / 100000).toFixed(1)}L`, "Revenue"]} />
                <Line
                  type="monotone" dataKey="revenue" stroke="#2563EB"
                  strokeWidth={2.5} dot={{ fill: "#2563EB", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={complianceData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                  {complianceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-3">
              {complianceData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-slate-600">{d.name}</span>
                  </div>
                  <span className="font-semibold text-slate-800">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Growth */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Client Growth</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/clients" className="text-[#2563EB] text-xs">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={clientGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip />
              <Bar dataKey="clients" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Manage Clients", href: "/dashboard/clients", color: "bg-blue-600" },
          { label: "View Leads", href: "/dashboard/leads", color: "bg-amber-600" },
          { label: "Staff Management", href: "/dashboard/staff", color: "bg-purple-600" },
          { label: "CMS / Blog", href: "/dashboard/cms", color: "bg-teal-600" },
        ].map(({ label, href, color }) => (
          <Link
            key={label}
            href={href}
            className={`${color} text-white rounded-2xl p-4 flex items-center justify-between font-semibold text-sm hover:opacity-90 transition-opacity`}
          >
            {label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
