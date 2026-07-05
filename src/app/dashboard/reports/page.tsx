import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ReportsPage } from "@/components/dashboard/reports-page";

export const dynamic = "force-dynamic";

export default async function Reports() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!["SUPER_ADMIN", "CA_STAFF"].includes(role)) redirect("/dashboard");

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 3, 1); // April 1 (Indian FY)

  const [
    totalClients,
    totalCompliance,
    completedCompliance,
    overdueCompliance,
    totalInvoices,
    paidInvoices,
    pendingAmount,
    totalLeads,
    convertedLeads,
    filingsByType,
  ] = await Promise.all([
    prisma.client.count({ where: { isActive: true } }),
    prisma.compliance.count(),
    prisma.compliance.count({ where: { status: "COMPLETED" } }),
    prisma.compliance.count({ where: { status: "OVERDUE" } }),
    prisma.invoice.count(),
    prisma.invoice.aggregate({
      where: { status: "PAID" },
      _sum: { totalAmount: true },
      _count: true,
    }),
    prisma.invoice.aggregate({
      where: { status: { in: ["SENT", "OVERDUE"] } },
      _sum: { totalAmount: true },
    }),
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "CONVERTED" } }),
    prisma.compliance.groupBy({
      by: ["complianceType"],
      _count: { complianceType: true },
      orderBy: { _count: { complianceType: "desc" } },
      take: 8,
    }),
  ]);

  return (
    <ReportsPage
      stats={{
        totalClients,
        totalCompliance,
        completedCompliance,
        overdueCompliance,
        completionRate: totalCompliance > 0
          ? Math.round((completedCompliance / totalCompliance) * 100)
          : 0,
        totalRevenue: Number(paidInvoices._sum.totalAmount ?? 0),
        paidInvoicesCount: paidInvoices._count,
        pendingAmount: Number(pendingAmount._sum.totalAmount ?? 0),
        totalLeads,
        convertedLeads,
        conversionRate: totalLeads > 0
          ? Math.round((convertedLeads / totalLeads) * 100)
          : 0,
      }}
      filingsByType={filingsByType.map((f) => ({
        type: f.complianceType.replace(/_/g, " "),
        count: f._count.complianceType,
      }))}
    />
  );
}
