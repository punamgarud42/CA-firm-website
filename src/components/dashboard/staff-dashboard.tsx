"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CheckSquare, Calendar, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export function StaffDashboard({ staff }: { staff: any }) {
  const clientCount = staff?.assignedClients?.length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Staff Dashboard</h1>
        <p className="text-slate-500">Welcome back! Manage your assigned clients.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Assigned Clients", value: clientCount, color: "bg-blue-50 text-blue-600" },
          { icon: CheckSquare, label: "Pending Tasks", value: "—", color: "bg-yellow-50 text-yellow-600" },
          { icon: Calendar, label: "Today's Meetings", value: "—", color: "bg-green-50 text-green-600" },
          { icon: FileText, label: "Docs to Review", value: "—", color: "bg-purple-50 text-purple-600" },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label}>
            <CardContent className="p-5">
              <div className={`inline-flex p-2.5 rounded-xl ${color} mb-3`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-black text-slate-900">{value}</p>
              <p className="text-sm text-slate-500 mt-1">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Clients</CardTitle>
        </CardHeader>
        <CardContent>
          {staff?.assignedClients?.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-6">No clients assigned yet.</p>
          ) : (
            <div className="space-y-2">
              {staff?.assignedClients?.map((client: any) => (
                <div key={client.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50">
                  <span className="font-medium text-slate-800">{client.companyName}</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/clients/${client.id}`}>
                      View <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
