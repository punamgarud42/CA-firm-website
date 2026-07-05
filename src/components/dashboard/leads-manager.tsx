"use client";
import { useState } from "react";
import { formatDate, getStatusColor, cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Phone, Mail, Search, TrendingUp, Users, CheckCircle, XCircle } from "lucide-react";
import { updateLeadStatus } from "@/actions/leads";
import { useToast } from "@/components/ui/toast-provider";

const STATUSES = ["All", "NEW", "CONTACTED", "CONVERTED", "LOST"];

const statusColors: Record<string, string> = {
  NEW: "bg-purple-100 text-purple-800",
  CONTACTED: "bg-blue-100 text-blue-800",
  CONVERTED: "bg-green-100 text-green-800",
  LOST: "bg-gray-100 text-gray-500",
};

export function LeadsManager({ leads }: { leads: any[] }) {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = leads.filter((l) => {
    const matchStatus = statusFilter === "All" || l.status === statusFilter;
    const matchSearch =
      search === "" ||
      (l.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (l.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (l.company ?? "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  async function handleStatusChange(leadId: string, newStatus: string) {
    setUpdating(leadId);
    await updateLeadStatus(leadId, newStatus);
    setUpdating(null);
    toast({ title: "Status updated", variant: "success" });
  }

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "NEW").length,
    converted: leads.filter((l) => l.status === "CONVERTED").length,
    conversionRate: leads.length > 0
      ? Math.round((leads.filter((l) => l.status === "CONVERTED").length / leads.length) * 100)
      : 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Lead Management</h1>
          <p className="text-slate-500">Track and convert website leads into clients</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Leads", value: counts.total, icon: Users, color: "bg-blue-50 text-blue-600" },
          { label: "New Leads", value: counts.new, icon: UserPlus, color: "bg-purple-50 text-purple-600" },
          { label: "Converted", value: counts.converted, icon: CheckCircle, color: "bg-green-50 text-green-600" },
          { label: "Conversion Rate", value: `${counts.conversionRate}%`, icon: TrendingUp, color: "bg-amber-50 text-amber-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${color}`}>
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
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
          />
        </div>
        <div className="flex gap-2">
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

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Contact</th>
                <th>Service Interest</th>
                <th>Source</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <UserPlus className="h-8 w-8 mx-auto mb-2" />
                    No leads found
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div>
                        <p className="font-semibold text-slate-900">{lead.name}</p>
                        {lead.company && <p className="text-xs text-slate-400">{lead.company}</p>}
                      </div>
                    </td>
                    <td>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Mail className="h-3 w-3" />{lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Phone className="h-3 w-3" />{lead.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-sm text-slate-600">{lead.service ?? "—"}</td>
                    <td className="text-sm text-slate-500">{lead.source ?? "WEBSITE"}</td>
                    <td className="text-xs text-slate-500">{formatDate(lead.createdAt)}</td>
                    <td>
                      <span className={cn("status-badge", statusColors[lead.status] ?? "bg-slate-100 text-slate-700")}>
                        {lead.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {lead.status === "NEW" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-blue-600"
                            onClick={() => handleStatusChange(lead.id, "CONTACTED")}
                            loading={updating === lead.id}
                          >
                            Mark Contacted
                          </Button>
                        )}
                        {lead.status === "CONTACTED" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-green-600"
                              onClick={() => handleStatusChange(lead.id, "CONVERTED")}
                              loading={updating === lead.id}
                            >
                              Convert
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-red-500"
                              onClick={() => handleStatusChange(lead.id, "LOST")}
                            >
                              Lost
                            </Button>
                          </>
                        )}
                        {(lead.status === "CONVERTED" || lead.status === "LOST") && (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
