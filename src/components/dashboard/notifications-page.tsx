"use client";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell, AlertCircle, Clock, CreditCard, MessageSquare,
  CheckCircle, UserPlus, CheckSquare, ExternalLink
} from "lucide-react";
import Link from "next/link";

const TYPE_CONFIG: Record<string, {
  icon: React.ComponentType<any>;
  color: string;
  bg: string;
  href: string;
}> = {
  OVERDUE:  { icon: AlertCircle,    color: "text-red-600",    bg: "bg-red-50",    href: "/dashboard/compliance" },
  DUE_SOON: { icon: Clock,          color: "text-amber-600",  bg: "bg-amber-50",  href: "/dashboard/compliance" },
  INVOICE:  { icon: CreditCard,     color: "text-blue-600",   bg: "bg-blue-50",   href: "/dashboard/invoices" },
  MESSAGE:  { icon: MessageSquare,  color: "text-purple-600", bg: "bg-purple-50", href: "/dashboard/messages" },
  LEAD:     { icon: UserPlus,       color: "text-green-600",  bg: "bg-green-50",  href: "/dashboard/leads" },
  TASK:     { icon: CheckSquare,    color: "text-teal-600",   bg: "bg-teal-50",   href: "/dashboard/tasks" },
};

export function NotificationsPage({ notifications }: { notifications: any[] }) {
  const urgent = notifications.filter((n) => n.urgent);
  const normal = notifications.filter((n) => !n.urgent);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Bell className="h-6 w-6 text-[#2563EB]" />
            Notifications
          </h1>
          <p className="text-slate-500">
            {notifications.length === 0
              ? "You're all caught up!"
              : `${notifications.length} notification${notifications.length > 1 ? "s" : ""} — ${urgent.length} urgent`}
          </p>
        </div>
        {notifications.length > 0 && (
          <Button variant="ghost" size="sm" className="text-slate-500 text-xs">
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <CheckCircle className="h-16 w-16 mb-4 text-green-300" />
          <p className="text-lg font-semibold">All caught up!</p>
          <p className="text-sm mt-1">No notifications at this time.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Urgent */}
          {urgent.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> Urgent — Action Required
              </h2>
              <div className="space-y-3">
                {urgent.map((n) => <NotificationCard key={n.id} notification={n} />)}
              </div>
            </div>
          )}

          {/* Normal */}
          {normal.length > 0 && (
            <div>
              {urgent.length > 0 && (
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">
                  Other Notifications
                </h2>
              )}
              <div className="space-y-3">
                {normal.map((n) => <NotificationCard key={n.id} notification={n} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationCard({ notification: n }: { notification: any }) {
  const config = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.TASK;
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm",
      n.urgent ? "border-red-200 bg-red-50/50" : "border-slate-100 bg-white"
    )}>
      <div className={cn("p-2.5 rounded-xl flex-shrink-0", config.bg)}>
        <Icon className={cn("h-5 w-5", config.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn("font-semibold text-sm", n.urgent ? "text-red-900" : "text-slate-900")}>
          {n.title}
        </p>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.description}</p>
      </div>
      <Link
        href={config.href}
        className={cn(
          "flex items-center gap-1 text-xs font-semibold flex-shrink-0 px-3 py-1.5 rounded-lg transition-colors",
          n.urgent
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        )}
      >
        View <ExternalLink className="h-3 w-3" />
      </Link>
    </div>
  );
}
