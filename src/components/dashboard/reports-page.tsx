"use client";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadialBarChart, RadialBar, Cell
} from "recharts";
import {
  Download, FileText, Users, Shield, CreditCard,
  UserPlus, TrendingUp, CheckCircle, AlertCircle, Clock
} from "lucide-react";

interface Stats {
  totalClients: number;
  totalCompliance: number;
  completedCompliance: number;
  overdueCompliance: number;
  completionRate: number;
  totalRevenue: number;
  paidInvoicesCount: number;
  pendingAmount: number;
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
}

export function ReportsPage({
  stats,
  filingsByType,
}: {
  stats: Stats;
  filingsByType: { type: string; count: number }[];
}) {
  const kpis = [
    { label: "Active Clients", value: stats.totalClients.toString(), icon: Users, color: "bg-blue-50 text-blue-600", trend: null },
    { label: "Compliance Rate", value: `${stats.completionRate}%`, icon: Shield, color: "bg-green-50 text-green-600", trend: `${stats.completedCompliance}/${stats.totalCompliance}` },
    { label: "Total Revenue Collected", value: formatCurrency(stats.totalRevenue), icon: CreditCard, color: "bg-purple-50 text-purple-600", trend: `${stats.paidInvoicesCount} invoices paid` },
    { label: "Pending Collections", value: formatCurrency(stats.pendingAmount), icon: Clock, color: "bg-amber-50 text-amber-600", trend: "Outstanding" },
    { label: "Lead Conversion Rate", value: `${stats.conversionRate}%`, icon: TrendingUp, color: "bg-teal-50 text-teal-600", trend: `${stats.convertedLeads}/${stats.totalLeads}` },
    { label: "Overdue Compliance", value: stats.overdueCompliance.toString(), icon: AlertCircle, color: "bg-red-50 text-red-600", trend: "Needs attention" },
  ];

  const radialData = [
    { name: "Completion", value: stats.completionRate, fill: "#22c55e" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Reports</h1>
          <p className="text-slate-500">Business performance summary</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" /> Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" /> Export Excel
          </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map(({ label, value, icon: Icon, color, trend }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">{value}</p>
              <p className="text-sm font-medium text-slate-600 mt-0.5">{label}</p>
              {trend && <p className="text-xs text-slate-400 mt-1">{trend}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Filings by Type */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Compliance Filings by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={filingsByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="type" tick={{ fontSize: 10, fill: "#94a3b8" }} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Completion Gauge */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Completion</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative">
              <ResponsiveContainer width={160} height={160}>
                <RadialBarChart
                  cx="50%" cy="50%"
                  innerRadius="60%" outerRadius="90%"
                  data={radialData}
                  startAngle={180} endAngle={0}
                >
                  <RadialBar dataKey="value" cornerRadius={6} background={{ fill: "#f1f5f9" }}>
                    {radialData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-black text-slate-900">{stats.completionRate}%</span>
                <span className="text-xs text-slate-400">Complete</span>
              </div>
            </div>
            <div className="w-full space-y-2 mt-4">
              {[
                { label: "Completed", value: stats.completedCompliance, color: "bg-green-500" },
                { label: "Pending", value: stats.totalCompliance - stats.completedCompliance - stats.overdueCompliance, color: "bg-amber-400" },
                { label: "Overdue", value: stats.overdueCompliance, color: "bg-red-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-slate-600">{item.label}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Revenue Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#2563EB]" /> Revenue Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {[
              { label: "Total Collected", value: formatCurrency(stats.totalRevenue), color: "text-green-600" },
              { label: "Pending Collection", value: formatCurrency(stats.pendingAmount), color: "text-amber-600" },
              { label: "Invoices Paid", value: `${stats.paidInvoicesCount} invoices`, color: "text-slate-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-500">{label}</span>
                <span className={`text-sm font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Compliance Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#2563EB]" /> Compliance Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {[
              { label: "Total Items", value: stats.totalCompliance, color: "text-slate-900" },
              { label: "Completed", value: stats.completedCompliance, color: "text-green-600" },
              { label: "Overdue", value: stats.overdueCompliance, color: "text-red-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-500">{label}</span>
                <span className={`text-sm font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lead Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-[#2563EB]" /> Lead Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {[
              { label: "Total Leads", value: stats.totalLeads, color: "text-slate-900" },
              { label: "Converted", value: stats.convertedLeads, color: "text-green-600" },
              { label: "Conversion Rate", value: `${stats.conversionRate}%`, color: "text-[#2563EB]" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                <span className="text-sm text-slate-500">{label}</span>
                <span className={`text-sm font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
