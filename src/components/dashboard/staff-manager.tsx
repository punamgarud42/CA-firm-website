"use client";
import { useState } from "react";
import { formatDate, cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Mail, Phone, Search, UserPlus, CheckCircle, XCircle } from "lucide-react";

export function StaffManager({ staff }: { staff: any[] }) {
  const [search, setSearch] = useState("");

  const filtered = staff.filter((s) => {
    const q = search.toLowerCase();
    return (
      search === "" ||
      (s.user?.name ?? "").toLowerCase().includes(q) ||
      (s.user?.email ?? "").toLowerCase().includes(q) ||
      (s.designation ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Staff Management</h1>
          <p className="text-slate-500">{staff.length} team members</p>
        </div>
        <Button variant="primary" size="sm">
          <UserPlus className="h-4 w-4" /> Add Staff Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Staff", value: staff.length },
          { label: "Active", value: staff.filter((s) => s.user?.isActive).length },
          { label: "Avg Clients/CA", value: staff.length > 0 ? Math.round(staff.reduce((sum, s) => sum + s._count.assignedClients, 0) / staff.length) : 0 },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-black text-slate-900">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search staff..."
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Staff Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-slate-400">
            <Users className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No staff members found</p>
          </div>
        ) : (
          filtered.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-card transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white font-black text-base">
                    {(member.user?.name ?? "S")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{member.user?.name}</p>
                    <p className="text-xs text-[#2563EB] font-medium">{member.designation ?? "CA Staff"}</p>
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                  member.user?.isActive ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
                )}>
                  {member.user?.isActive
                    ? <><CheckCircle className="h-3 w-3" /> Active</>
                    : <><XCircle className="h-3 w-3" /> Inactive</>
                  }
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {member.user?.email && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="truncate">{member.user.email}</span>
                  </div>
                )}
                {member.user?.phone && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone className="h-3.5 w-3.5" />
                    {member.user.phone}
                  </div>
                )}
              </div>

              {member.expertise?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {member.expertise.slice(0, 3).map((exp: string) => (
                    <span key={exp} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                      {exp}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-lg font-black text-slate-900">{member._count.assignedClients}</p>
                  <p className="text-xs text-slate-400">Clients</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500">Joined</p>
                  <p className="text-xs font-medium text-slate-700">{formatDate(member.createdAt)}</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-[#2563EB]">
                  View Profile
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
