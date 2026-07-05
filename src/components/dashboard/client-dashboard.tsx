"use client";
import { formatDate, getStatusColor, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, AlertCircle, Clock, Calendar, FileText,
  MessageSquare, CreditCard, TrendingUp, ArrowRight, Bell
} from "lucide-react";
import Link from "next/link";

interface Props {
  client: any;
  user: any;
}

function StatCard({ icon: Icon, label, value, sub, color }: any) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
            <p className="text-2xl font-black text-slate-900">{value}</p>
            {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
          </div>
          <div className={`p-2.5 rounded-xl ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ClientDashboard({ client, user }: Props) {
  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
        <h3 className="font-semibold text-slate-600 mb-2">Profile Setup Required</h3>
        <p className="text-slate-400 text-sm mb-4">
          Your client profile needs to be configured by our team.
        </p>
        <Button variant="primary" asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
    );
  }

  const overdueCompliance = client.compliance?.filter((c: any) => c.status === "OVERDUE") ?? [];
  const pendingTasks = client.tasks?.filter((t: any) => t.status === "TODO") ?? [];
  const upcomingAppointments = client.appointments ?? [];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Good morning, {user?.name?.split(" ")[0] ?? "there"}! 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Here's your compliance overview for {client.companyName}
          </p>
        </div>
        <Button variant="primary" size="sm" asChild>
          <Link href="/dashboard/messages">
            <MessageSquare className="h-4 w-4" />
            Message CA
          </Link>
        </Button>
      </div>

      {/* Overdue Alert */}
      {overdueCompliance.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4">
          <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-red-900">
              {overdueCompliance.length} Overdue Compliance Item{overdueCompliance.length > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-red-700">
              Immediate action required to avoid penalties.
            </p>
          </div>
          <Button variant="destructive" size="sm" asChild>
            <Link href="/dashboard/compliance">View Now</Link>
          </Button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CheckCircle}
          label="Compliance Items"
          value={client.compliance?.length ?? 0}
          sub={`${overdueCompliance.length} overdue`}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          icon={Clock}
          label="Pending Tasks"
          value={pendingTasks.length}
          sub="Action required"
          color="bg-yellow-50 text-yellow-600"
        />
        <StatCard
          icon={Calendar}
          label="Appointments"
          value={upcomingAppointments.length}
          sub="Upcoming"
          color="bg-green-50 text-green-600"
        />
        <StatCard
          icon={FileText}
          label="Documents"
          value="Active"
          sub="All uploaded"
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Compliance Status */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base">Compliance Tracker</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/compliance" className="text-[#2563EB] text-xs">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {client.compliance?.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <p className="text-sm">All compliance items up to date!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {client.compliance?.slice(0, 5).map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {item.complianceType}
                      </p>
                      <p className="text-xs text-slate-500">Due: {formatDate(item.dueDate)}</p>
                    </div>
                    <span className={cn("status-badge", getStatusColor(item.status))}>
                      {item.status.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#2563EB]" />
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-sm text-slate-400 mb-3">No upcoming appointments</p>
                  <Button variant="primary" size="sm" asChild>
                    <Link href="/dashboard/appointments">Book Appointment</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {upcomingAppointments.map((apt: any) => (
                    <div key={apt.id} className="p-3 bg-blue-50 rounded-xl">
                      <p className="text-sm font-semibold text-slate-900">{apt.title}</p>
                      <p className="text-xs text-slate-500">{formatDate(apt.scheduledAt)}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-2 gap-2">
              {[
                { label: "Upload Doc", href: "/dashboard/documents", icon: FileText, color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
                { label: "Book Meeting", href: "/dashboard/appointments", icon: Calendar, color: "bg-green-50 text-green-700 hover:bg-green-100" },
                { label: "View Invoice", href: "/dashboard/invoices", icon: CreditCard, color: "bg-purple-50 text-purple-700 hover:bg-purple-100" },
                { label: "AI Assistant", href: "/dashboard/ai-assistant", icon: TrendingUp, color: "bg-amber-50 text-amber-700 hover:bg-amber-100" },
              ].map(({ label, href, icon: Icon, color }) => (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl text-xs font-semibold transition-colors",
                    color
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
