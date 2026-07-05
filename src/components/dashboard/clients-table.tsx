"use client";
import { useState } from "react";
import { formatDate, cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users, Search, Filter, Building2, Mail, Phone,
  FileText, CheckSquare, Shield, ArrowRight, UserPlus
} from "lucide-react";
import Link from "next/link";

export function ClientsTable({ clients, staffList }: { clients: any[]; staffList: any[] }) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("All");

  const industries = ["All", ...Array.from(new Set(clients.map((c) => c.industry).filter(Boolean))) as string[]];

  const filtered = clients.filter((c) => {
    const matchSearch =
      search === "" ||
      (c.companyName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.user?.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.user?.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.gstNumber ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (c.panNumber ?? "").toLowerCase().includes(search.toLowerCase());
    const matchIndustry = industry === "All" || c.industry === industry;
    return matchSearch && matchIndustry;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Clients</h1>
          <p className="text-slate-500">{clients.length} total clients</p>
        </div>
        <Button variant="primary" size="sm" asChild>
          <Link href="/dashboard/clients/new">
            <UserPlus className="h-4 w-4" /> Add Client
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Clients", value: clients.length },
          { label: "Active", value: clients.filter((c) => c.isActive).length },
          { label: "With CA Assigned", value: clients.filter((c) => c.assignedCAId).length },
          { label: "New This Month", value: clients.filter((c) => {
            const d = new Date(c.createdAt);
            const now = new Date();
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
          }).length },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-black text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex gap-3 items-center flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, GST, PAN..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
          />
        </div>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
        >
          {industries.map((ind) => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Client / Company</th>
                <th>Contact</th>
                <th>GST / PAN</th>
                <th>Assigned CA</th>
                <th>Stats</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <Users className="h-8 w-8 mx-auto mb-2" />
                    No clients found
                  </td>
                </tr>
              ) : (
                filtered.map((client) => (
                  <tr key={client.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {(client.companyName ?? "C")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{client.companyName}</p>
                          <p className="text-xs text-slate-400">{client.user?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Mail className="h-3 w-3" />{client.user?.email}
                        </div>
                        {client.user?.phone && (
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Phone className="h-3 w-3" />{client.user.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-xs">
                      {client.gstNumber && <p className="text-slate-700">GST: {client.gstNumber}</p>}
                      {client.panNumber && <p className="text-slate-500">PAN: {client.panNumber}</p>}
                      {!client.gstNumber && !client.panNumber && <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-sm">
                      {client.assignedCA?.user?.name ? (
                        <span className="text-slate-700">{client.assignedCA.user.name}</span>
                      ) : (
                        <span className="text-slate-300">Unassigned</span>
                      )}
                    </td>
                    <td>
                      <div className="flex gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Shield className="h-3 w-3" />{client._count.compliance}</span>
                        <span className="flex items-center gap-1"><FileText className="h-3 w-3" />{client._count.documents}</span>
                        <span className="flex items-center gap-1"><CheckSquare className="h-3 w-3" />{client._count.tasks}</span>
                      </div>
                    </td>
                    <td className="text-xs text-slate-500">{formatDate(client.createdAt)}</td>
                    <td>
                      <Button variant="ghost" size="sm" asChild className="text-xs text-[#2563EB]">
                        <Link href={`/dashboard/clients/${client.id}`}>
                          View <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
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
