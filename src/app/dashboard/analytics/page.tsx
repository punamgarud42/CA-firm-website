import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "SUPER_ADMIN") redirect("/dashboard");

  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return { year: d.getFullYear(), month: d.getMonth(), label: d.toLocaleString("en-IN", { month: "short" }) };
  });

  const revenueData = await Promise.all(
    months.map(async ({ year, month, label }) => {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0, 23, 59, 59);
      const agg = await prisma.invoice.aggregate({
        where: { status: "PAID", createdAt: { gte: start, lte: end } },
        _sum: { totalAmount: true },
      });
      return { month: label, revenue: Number(agg._sum.totalAmount ?? 0) };
    })
  );

  const clientGrowthData = await Promise.all(
    months.map(async ({ year, month, label }) => {
      const end = new Date(year, month + 1, 0, 23, 59, 59);
      const count = await prisma.client.count({ where: { createdAt: { lte: end } } });
      return { month: label, clients: count };
    })
  );

  const complianceStats = await prisma.compliance.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const leadStats = await prisma.lead.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const topServices = await prisma.lead.groupBy({
    by: ["service"],
    _count: { service: true },
    orderBy: { _count: { service: "desc" } },
    take: 6,
    where: { service: { not: null } },
  });

  return (
    <AnalyticsDashboard
      revenueData={revenueData}
      clientGrowthData={clientGrowthData}
      complianceStats={complianceStats.map((s) => ({ status: s.status, count: s._count.status }))}
      leadStats={leadStats.map((s) => ({ status: s.status, count: s._count.status }))}
      topServices={topServices.map((s) => ({ service: s.service ?? "Other", count: s._count.service }))}
    />
  );
}
