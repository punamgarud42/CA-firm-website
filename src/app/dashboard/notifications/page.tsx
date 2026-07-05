import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NotificationsPage } from "@/components/dashboard/notifications-page";

export const dynamic = "force-dynamic";

export default async function Notifications() {
  const session = await auth();
  const userId = session?.user?.id!;
  const role = (session?.user as any)?.role;

  // Gather smart notifications from DB state
  const now = new Date();
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  let notifications: any[] = [];

  if (role === "CLIENT") {
    const client = await prisma.client.findUnique({ where: { userId } });
    if (client) {
      // Overdue compliance
      const overdue = await prisma.compliance.findMany({
        where: { clientId: client.id, status: "OVERDUE" },
        select: { id: true, complianceType: true, dueDate: true },
        take: 10,
      });
      notifications.push(...overdue.map((c) => ({
        id: `comp-overdue-${c.id}`, type: "OVERDUE",
        title: `${c.complianceType.replace(/_/g, " ")} is OVERDUE`,
        description: `This compliance item was due on ${c.dueDate.toDateString()}. Take action immediately to avoid penalties.`,
        createdAt: c.dueDate, urgent: true,
      })));

      // Due soon
      const dueSoon = await prisma.compliance.findMany({
        where: { clientId: client.id, status: "PENDING", dueDate: { lte: in7Days, gte: now } },
        select: { id: true, complianceType: true, dueDate: true },
        take: 10,
      });
      notifications.push(...dueSoon.map((c) => ({
        id: `comp-soon-${c.id}`, type: "DUE_SOON",
        title: `${c.complianceType.replace(/_/g, " ")} due in ${Math.ceil((c.dueDate.getTime() - now.getTime()) / 86400000)} days`,
        description: `Deadline: ${c.dueDate.toDateString()}. Please ensure all documents are ready.`,
        createdAt: now, urgent: false,
      })));

      // Pending invoices
      const pendingInvoices = await prisma.invoice.findMany({
        where: { clientId: client.id, status: "SENT" },
        select: { id: true, invoiceNo: true, totalAmount: true, dueDate: true },
        take: 5,
      });
      notifications.push(...pendingInvoices.map((inv) => ({
        id: `inv-${inv.id}`, type: "INVOICE",
        title: `Invoice ${inv.invoiceNo} pending payment`,
        description: `Amount: ₹${Number(inv.totalAmount).toLocaleString("en-IN")}. ${inv.dueDate ? `Due: ${inv.dueDate.toDateString()}` : ""}`,
        createdAt: now, urgent: false,
      })));

      // Unread messages
      const unreadCount = await prisma.message.count({
        where: { receiverId: userId, isRead: false },
      });
      if (unreadCount > 0) {
        notifications.push({
          id: "msg-unread", type: "MESSAGE",
          title: `${unreadCount} unread message${unreadCount > 1 ? "s" : ""} from your CA`,
          description: "Check your messages to stay updated on your compliance status.",
          createdAt: now, urgent: false,
        });
      }
    }
  } else {
    // Admin/Staff: system-wide alerts
    const overdueCount = await prisma.compliance.count({ where: { status: "OVERDUE" } });
    const newLeads = await prisma.lead.count({ where: { status: "NEW" } });
    const pendingTasks = await prisma.task.count({ where: { status: "TODO" } });

    if (overdueCount > 0) notifications.push({
      id: "admin-overdue", type: "OVERDUE",
      title: `${overdueCount} overdue compliance items need attention`,
      description: "Review and take action on overdue compliance items across all clients.",
      createdAt: now, urgent: true,
    });
    if (newLeads > 0) notifications.push({
      id: "admin-leads", type: "LEAD",
      title: `${newLeads} new lead${newLeads > 1 ? "s" : ""} waiting for follow-up`,
      description: "New consultation requests received through the website.",
      createdAt: now, urgent: false,
    });
    if (pendingTasks > 0) notifications.push({
      id: "admin-tasks", type: "TASK",
      title: `${pendingTasks} pending tasks across all clients`,
      description: "Review and assign tasks to CA staff members.",
      createdAt: now, urgent: false,
    });
  }

  return <NotificationsPage notifications={notifications} />;
}
