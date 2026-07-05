import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { ClientDashboard } from "@/components/dashboard/client-dashboard";
import { StaffDashboard } from "@/components/dashboard/staff-dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const role = (session?.user as any)?.role ?? "CLIENT";
  const userId = session?.user?.id;

  if (role === "SUPER_ADMIN") {
    // Fetch admin stats
    const [totalClients, activeLeads, pendingCompliance, monthlyInvoices] =
      await Promise.all([
        prisma.client.count(),
        prisma.lead.count({ where: { status: { in: ["NEW", "CONTACTED"] } } }),
        prisma.compliance.count({ where: { status: { in: ["PENDING", "OVERDUE"] } } }),
        prisma.invoice.aggregate({
          where: {
            status: "PAID",
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
          _sum: { totalAmount: true },
        }),
      ]);

    return (
      <AdminDashboard
        stats={{
          totalClients,
          activeLeads,
          pendingCompliance,
          monthlyRevenue: Number(monthlyInvoices._sum.totalAmount ?? 0),
        }}
      />
    );
  }

  if (role === "CA_STAFF") {
    const staffMember = await prisma.staffMember.findUnique({
      where: { userId },
      include: { assignedClients: { select: { id: true, companyName: true } } },
    });

    return <StaffDashboard staff={staffMember} />;
  }

  // Client dashboard
  const client = await prisma.client.findUnique({
    where: { userId },
    include: {
      compliance: {
        where: { status: { in: ["PENDING", "OVERDUE", "IN_PROGRESS"] } },
        orderBy: { dueDate: "asc" },
        take: 5,
      },
      tasks: {
        where: { status: { not: "COMPLETED" } },
        orderBy: { dueDate: "asc" },
        take: 5,
      },
      appointments: {
        where: { scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: "asc" },
        take: 3,
      },
    },
  });

  return <ClientDashboard client={client} user={session?.user as any} />;
}
