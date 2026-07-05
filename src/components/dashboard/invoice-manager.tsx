"use client";
import { useState } from "react";
import { formatDate, formatCurrency, getStatusColor, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Eye, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react";

export function InvoiceManager({ invoices, isAdmin }: { invoices: any[]; isAdmin: boolean }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = invoices.filter(
    (inv) => statusFilter === "All" || inv.status === statusFilter
  );

  const totalPaid = invoices.filter((i) => i.status === "PAID").reduce((s, i) => s + Number(i.totalAmount), 0);
  const totalPending = invoices.filter((i) => i.status === "SENT").reduce((s, i) => s + Number(i.totalAmount), 0);
  const totalOverdue = invoices.filter((i) => i.status === "OVERDUE").reduce((s, i) => s + Number(i.totalAmount), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Invoices</h1>
          <p className="text-slate-500">Manage billing and payment history</p>
        </div>
        {isAdmin && (
          <Button variant="primary" size="sm">+ Create Invoice</Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Invoices", value: invoices.length.toString(), icon: CreditCard, color: "bg-blue-50 text-blue-600" },
          { label: "Paid", value: formatCurrency(totalPaid), icon: CheckCircle, color: "bg-green-50 text-green-600" },
          { label: "Pending", value: formatCurrency(totalPending), icon: Clock, color: "bg-yellow-50 text-yellow-600" },
          { label: "Overdue", value: formatCurrency(totalOverdue), icon: AlertCircle, color: "bg-red-50 text-red-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {["All", "DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"].map((s) => (
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

      {/* Invoice Table */}
      <Card>
        <CardContent className="p-0">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                {isAdmin && <th>Client</th>}
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="text-center py-12 text-slate-400">
                    <CreditCard className="h-8 w-8 mx-auto mb-2" />
                    No invoices found
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <p className="font-semibold text-slate-900 text-sm">{inv.invoiceNo}</p>
                      {inv.description && <p className="text-xs text-slate-400">{inv.description}</p>}
                    </td>
                    {isAdmin && <td className="text-sm">{inv.client?.companyName ?? "—"}</td>}
                    <td>
                      <p className="font-semibold text-slate-900">{formatCurrency(Number(inv.totalAmount))}</p>
                      {inv.gstAmount && (
                        <p className="text-xs text-slate-400">GST: {formatCurrency(Number(inv.gstAmount))}</p>
                      )}
                    </td>
                    <td className={cn(
                      "text-sm",
                      inv.status === "OVERDUE" ? "text-red-600 font-semibold" : "text-slate-500"
                    )}>
                      {inv.dueDate ? formatDate(inv.dueDate) : "—"}
                    </td>
                    <td>
                      <span className={cn("status-badge", getStatusColor(inv.status))}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {inv.invoiceUrl && (
                          <>
                            <a
                              href={inv.invoiceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#2563EB] transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                            <a
                              href={inv.invoiceUrl}
                              download
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#2563EB] transition-colors"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          </>
                        )}
                        {inv.status === "SENT" && (
                          <Button variant="primary" size="sm" className="text-xs h-7 px-3">
                            Pay Now
                          </Button>
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
