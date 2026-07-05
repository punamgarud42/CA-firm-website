import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!session || role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  const [
    totalClients,
    newClientsThisMonth,
    activeLeads,
    pendingCompliance,
    overdueCompliance,
    monthlyRevenue,
    lastMonthRevenue,
    totalStaff,
    pendingTasks,
  ] = await Promise.all([
    prisma.client.count(),
    prisma.client.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.lead.count({ where: { status: { in: ["NEW", "CONTACTED"] } } }),
    prisma.compliance.count({ where: { status: "PENDING" } }),
    prisma.compliance.count({ where: { status: "OVERDUE" } }),
    prisma.invoice.aggregate({
      where: { status: "PAID", createdAt: { gte: startOfMonth } },
      _sum: { totalAmount: true },
    }),
    prisma.invoice.aggregate({
      where: { status: "PAID", createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } },
      _sum: { totalAmount: true },
    }),
    prisma.staffMember.count(),
    prisma.task.count({ where: { status: { in: ["TODO", "IN_PROGRESS"] } } }),
  ]);

  const currentRevenue = Number(monthlyRevenue._sum.totalAmount ?? 0);
  const previousRevenue = Number(lastMonthRevenue._sum.totalAmount ?? 0);
  const revenueGrowth = previousRevenue > 0
    ? Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100)
    : 0;

  return NextResponse.json({
    totalClients,
    newClientsThisMonth,
    activeLeads,
    pendingCompliance,
    overdueCompliance,
    monthlyRevenue: currentRevenue,
    revenueGrowth,
    totalStaff,
    pendingTasks,
  });
}
