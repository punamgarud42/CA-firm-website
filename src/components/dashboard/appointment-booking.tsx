"use client";
import { useState } from "react";
import { formatDate, formatDateTime, getStatusColor, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Video, CheckCircle, X, Plus } from "lucide-react";
import { bookAppointment } from "@/actions/appointments";
import { useToast } from "@/components/ui/toast-provider";

export function AppointmentBooking({
  appointments,
  clientId,
  isAdmin,
}: {
  appointments: any[];
  clientId: string | null;
  isAdmin: boolean;
}) {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const upcoming = appointments.filter(
    (a) => new Date(a.scheduledAt) >= new Date() && a.status !== "CANCELLED"
  );
  const past = appointments.filter(
    (a) => new Date(a.scheduledAt) < new Date() || a.status === "COMPLETED"
  );

  async function handleBook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!clientId) return;
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    fd.append("clientId", clientId);
    const res = await bookAppointment(fd);
    setLoading(false);
    if (res.success) {
      toast({ title: "Appointment booked!", description: "We'll confirm your appointment shortly.", variant: "success" });
      setShowForm(false);
    } else {
      toast({ title: "Booking failed", description: res.error, variant: "error" });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Appointments</h1>
          <p className="text-slate-500">Schedule and manage meetings with your CA</p>
        </div>
        {clientId && (
          <Button variant="primary" size="sm" onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4" /> Book Appointment
          </Button>
        )}
      </div>

      {/* Booking Form */}
      {showForm && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Book New Appointment</CardTitle>
            <button onClick={() => setShowForm(false)}>
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBook} className="grid md:grid-cols-2 gap-4">
              <Input label="Meeting Title" name="title" placeholder="e.g., GST Filing Review" required />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Date & Time</label>
                <input
                  type="datetime-local"
                  name="scheduledAt"
                  required
                  min={new Date().toISOString().slice(0, 16)}
                  className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (optional)</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Topics to discuss..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                />
              </div>
              <div className="md:col-span-2 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button type="submit" variant="primary" loading={loading}>Book Appointment</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Upcoming */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">Upcoming Appointments ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center">
            <Calendar className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No upcoming appointments</p>
            {clientId && (
              <Button variant="primary" size="sm" className="mt-4" onClick={() => setShowForm(true)}>
                Book Your First Appointment
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className={cn("status-badge", getStatusColor(apt.status))}>
                    {apt.status}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{apt.title}</h3>
                {isAdmin && apt.client && (
                  <p className="text-xs text-slate-500 mb-2">{apt.client.companyName}</p>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <Clock className="h-3.5 w-3.5" />
                  {formatDateTime(apt.scheduledAt)}
                </div>
                {apt.meetingLink && (
                  <a
                    href={apt.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#2563EB] font-medium mt-3 hover:underline"
                  >
                    <Video className="h-4 w-4" />
                    Join Meeting
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Appointments */}
      {past.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Past Appointments</h2>
          <Card>
            <CardContent className="p-0">
              <table className="w-full data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    {isAdmin && <th>Client</th>}
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {past.map((apt) => (
                    <tr key={apt.id}>
                      <td className="font-medium text-slate-900">{apt.title}</td>
                      {isAdmin && <td className="text-sm">{apt.client?.companyName ?? "—"}</td>}
                      <td className="text-sm text-slate-500">{formatDateTime(apt.scheduledAt)}</td>
                      <td>
                        <span className={cn("status-badge", getStatusColor(apt.status))}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
