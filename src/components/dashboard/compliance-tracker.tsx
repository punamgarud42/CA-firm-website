"use client";
import { useState } from "react";
import { formatDate, getStatusColor, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Filter, AlertCircle, CheckCircle, Clock, Search } from "lucide-react";

const TYPES = ["All", "GST", "ITR", "ROC", "TDS", "AUDIT", "ADVANCE_TAX"];
const STATUSES = ["All", "PENDING", "IN_PROGRESS", "COMPLETED", "OVERDUE"];

export function ComplianceTracker({ compliance, isAdmin }: { compliance: any[]; isAdmin: boolean }) {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = compliance.filter((c) => {
    const matchType = typeFilter === "All" || c.complianceType === typeFilter;
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    const matchSearch = search === "" ||
      c.complianceType.toLowerCase().includes(search.toLowerCase()) ||
      (c.description ?? "").toLowerCase().includes(search.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const counts = {
    total: compliance.length,
    overdue: compliance.filter((c) => c.status === "OVERDUE").length,
    pending: compliance.filter((c) => c.status === "PENDING").length,
    completed: compliance.filter((c) => c.status === "COMPLETED").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Compliance Tracker</h1>
          <p className="text-slate-500">Track all your regulatory filings and deadlines</p>
        </div>
        {isAdmin && (
          <Button variant="primary" size="sm">+ Add Compliance Item</Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Items", value: counts.total, icon: Shield, color: "text-blue-600 bg-blue-50" },
          { label: "Overdue", value: counts.overdue, icon: AlertCircle, color: "text-red-600 bg-red-50" },
          { label: "Pending", value: counts.pending, icon: Clock, color: "text-yellow-600 bg-yellow-50" },
          { label: "Completed", value: counts.completed, icon: CheckCircle, color: "text-green-600 bg-green-50" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-xl ${color}`}>
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search compliance..."
            className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                statusFilter === s ? "bg-[#2563EB] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Compliance Type</th>
                  {isAdmin && <th>Client</th>}
                  <th>Due Date</th>
                  <th>Period</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="text-center py-12 text-slate-400">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                      No compliance items found
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div>
                          <p className="font-semibold text-slate-900">{item.complianceType.replace(/_/g, " ")}</p>
                          {item.description && <p className="text-xs text-slate-400">{item.description}</p>}
                        </div>
                      </td>
                      {isAdmin && <td className="text-sm">{item.client?.companyName ?? "—"}</td>}
                      <td className={item.status === "OVERDUE" ? "text-red-600 font-semibold" : ""}>
                        {formatDate(item.dueDate)}
                      </td>
                      <td className="text-sm text-slate-500">
                        {item.periodFrom && item.periodTo
                          ? `${formatDate(item.periodFrom)} – ${formatDate(item.periodTo)}`
                          : "—"}
                      </td>
                      <td>
                        <span className={cn("status-badge", getStatusColor(item.status))}>
                          {item.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        <Button variant="ghost" size="sm" className="text-[#2563EB] text-xs">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
