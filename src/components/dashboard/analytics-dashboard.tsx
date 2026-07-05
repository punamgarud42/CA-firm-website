"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
  AreaChart, Area
} from "recharts";
import { TrendingUp, Users, CheckCircle, UserPlus } from "lucide-react";

interface Props {
  revenueData: { month: string; revenue: number }[];
  clientGrowthData: { month: string; clients: number }[];
  complianceStats: { status: string; count: number }[];
  leadStats: { status: string; count: number }[];
  topServices: { service: string; count: number }[];
}

const COMPLIANCE_COLORS: Record<string, string> = {
  COMPLETED: "#22c55e",
  IN_PROGRESS: "#3b82f6",
  PENDING: "#f59e0b",
  OVERDUE: "#ef4444",
};

const LEAD_COLORS: Record<string, string> = {
  NEW: "#8b5cf6",
  CONTACTED: "#3b82f6",
  CONVERTED: "#22c55e",
  LOST: "#94a3b8",
};

export function AnalyticsDashboard({
  revenueData, clientGrowthData, complianceStats, leadStats, topServices
}: Props) {
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalClients = clientGrowthData[clientGrowthData.length - 1]?.clients ?? 0;
  const totalLeads = leadStats.reduce((s, d) => s + d.count, 0);
  const convertedLeads = leadStats.find((l) => l.status === "CONVERTED")?.count ?? 0;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Analytics & Reports</h1>
        <p className="text-slate-500">Business performance overview — last 6 months</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: "Total Revenue (6M)", value: formatCurrency(totalRevenue), color: "bg-green-50 text-green-600" },
          { icon: Users, label: "Total Clients", value: totalClients.toLocaleString("en-IN"), color: "bg-blue-50 text-blue-600" },
          { icon: UserPlus, label: "Total Leads", value: totalLeads.toString(), color: "bg-purple-50 text-purple-600" },
          { icon: CheckCircle, label: "Conversion Rate", value: `${conversionRate}%`, color: "bg-amber-50 text-amber-600" },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label}>
            <CardContent className="p-5 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${color} flex-shrink-0`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend (6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip formatter={(v: any) => [formatCurrency(v), "Revenue"]} />
              <Area
                type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2.5}
                fill="url(#revenueGrad)" dot={{ fill: "#2563EB", r: 4 }} activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Client Growth */}
        <Card>
          <CardHeader><CardTitle>Client Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={clientGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip />
                <Bar dataKey="clients" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Compliance Breakdown */}
        <Card>
          <CardHeader><CardTitle>Compliance Status Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <ResponsiveContainer width="55%" height={180}>
                <PieChart>
                  <Pie data={complianceStats} dataKey="count" nameKey="status" cx="50%" cy="50%"
                    innerRadius={45} outerRadius={70} paddingAngle={3}>
                    {complianceStats.map((entry, i) => (
                      <Cell key={i} fill={COMPLIANCE_COLORS[entry.status] ?? "#94a3b8"} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: any, n: any) => [v, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {complianceStats.map((s) => (
                  <div key={s.status} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: COMPLIANCE_COLORS[s.status] ?? "#94a3b8" }} />
                      <span className="text-slate-600 text-xs">{s.status.replace("_", " ")}</span>
                    </div>
                    <span className="font-bold text-slate-900">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lead Pipeline */}
        <Card>
          <CardHeader><CardTitle>Lead Pipeline</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leadStats.map((l) => {
                const pct = totalLeads > 0 ? Math.round((l.count / totalLeads) * 100) : 0;
                return (
                  <div key={l.status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{l.status}</span>
                      <span className="font-semibold text-slate-900">{l.count} ({pct}%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: LEAD_COLORS[l.status] ?? "#94a3b8" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card>
          <CardHeader><CardTitle>Top Services Requested</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={topServices} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
                <YAxis dataKey="service" type="category" tick={{ fontSize: 11, fill: "#64748b" }} width={130} />
                <Tooltip />
                <Bar dataKey="count" fill="#D4AF37" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
