"use client";
import { formatDate, formatCurrency, getStatusColor, cn, getInitials } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2, Mail, Phone, MapPin, ArrowLeft, Shield,
  FileText, CheckSquare, Calendar, CreditCard, UserCheck
} from "lucide-react";
import Link from "next/link";

export function ClientDetail({ client, staffList }: { client: any; staffList: any[] }) {
  return (
    <div className="space-y-6">
      {/* Back & Header */}
      <div>
        <Link href="/dashboard/clients" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Clients
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#2563EB] flex items-center justify-center text-white text-xl font-black">
              {(client.companyName ?? "C")[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">{client.companyName}</h1>
              <p className="text-slate-500">{client.user?.name} · {client.user?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                {client.industry && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                    {client.industry}
                  </span>
                )}
                <span className={cn("status-badge", client.isActive ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-500")}>
                  {client.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/messages`}>Message Client</Link>
            </Button>
            <Button variant="primary" size="sm">Edit Client</Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Info */}
        <div className="space-y-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-[#2563EB]" /> Company Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 text-sm">
              {client.gstNumber && (
                <div><p className="text-xs text-slate-400">GST Number</p><p className="font-medium text-slate-900">{client.gstNumber}</p></div>
              )}
              {client.panNumber && (
                <div><p className="text-xs text-slate-400">PAN Number</p><p className="font-medium text-slate-900">{client.panNumber}</p></div>
              )}
              {client.city && (
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-3.5 w-3.5" />
                  {[client.city, client.state, client.pincode].filter(Boolean).join(", ")}
                </div>
              )}
              <div><p className="text-xs text-slate-400">Client Since</p><p className="font-medium">{formatDate(client.createdAt)}</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-[#2563EB]" /> Assigned CA
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {client.assignedCA ? (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold">
                    {(client.assignedCA.user?.name ?? "CA")[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{client.assignedCA.user?.name}</p>
                    <p className="text-xs text-slate-400">{client.assignedCA.user?.email}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-3">
                  <p className="text-sm text-slate-400 mb-2">No CA assigned</p>
                  <Button variant="primary" size="sm">Assign CA</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Shield, label: "Compliance", value: client.compliance?.length ?? 0, color: "bg-blue-50 text-blue-600" },
              { icon: FileText, label: "Documents", value: client.documents?.length ?? 0, color: "bg-purple-50 text-purple-600" },
              { icon: CheckSquare, label: "Tasks", value: client.tasks?.length ?? 0, color: "bg-yellow-50 text-yellow-600" },
              { icon: Calendar, label: "Appointments", value: client.appointments?.length ?? 0, color: "bg-green-50 text-green-600" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white rounded-xl border border-slate-100 p-3 text-center">
                <div className={`inline-flex p-2 rounded-lg ${color} mb-1`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-lg font-black text-slate-900">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Activity */}
        <div className="lg:col-span-2 space-y-5">
          {/* Compliance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm">Compliance Items</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-[#2563EB]">View All</Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {client.compliance?.slice(0, 5).map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.complianceType.replace(/_/g, " ")}</p>
                      <p className="text-xs text-slate-400">Due: {formatDate(item.dueDate)}</p>
                    </div>
                    <span className={cn("status-badge", getStatusColor(item.status))}>
                      {item.status.replace("_", " ")}
                    </span>
                  </div>
                ))}
                {(!client.compliance || client.compliance.length === 0) && (
                  <p className="text-sm text-slate-400 text-center py-4">No compliance items</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm">Tasks</CardTitle>
              <Button variant="primary" size="sm" className="text-xs h-7 px-3">+ Add Task</Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {client.tasks?.slice(0, 4).map((task: any) => (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                    <div className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0",
                      task.status === "COMPLETED" ? "bg-green-500" :
                      task.status === "IN_PROGRESS" ? "bg-blue-500" : "bg-slate-300"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{task.title}</p>
                      {task.dueDate && <p className="text-xs text-slate-400">Due: {formatDate(task.dueDate)}</p>}
                    </div>
                    <span className={cn("status-badge text-xs", getStatusColor(task.status))}>
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                ))}
                {(!client.tasks || client.tasks.length === 0) && (
                  <p className="text-sm text-slate-400 text-center py-4">No tasks</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Invoices */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm">Recent Invoices</CardTitle>
              <Button variant="primary" size="sm" className="text-xs h-7 px-3">+ Create Invoice</Button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {client.invoices?.slice(0, 3).map((inv: any) => (
                  <div key={inv.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{inv.invoiceNo}</p>
                      <p className="text-xs text-slate-400">{formatDate(inv.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 text-sm">{formatCurrency(Number(inv.totalAmount))}</p>
                      <span className={cn("status-badge text-xs", getStatusColor(inv.status))}>
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
                {(!client.invoices || client.invoices.length === 0) && (
                  <p className="text-sm text-slate-400 text-center py-4">No invoices</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
