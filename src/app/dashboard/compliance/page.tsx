import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ComplianceTracker } from "@/components/dashboard/compliance-tracker";

export const dynamic = "force-dynamic";

export default async function CompliancePage() {
  const session = await auth();
  const userId = session?.user?.id;
  const role = (session?.user as any)?.role;

  let compliance: any[] = [];

  if (role === "CLIENT") {
    const client = await prisma.client.findUnique({ where: { userId } });
    if (client) {
      compliance = await prisma.compliance.findMany({
        where: { clientId: client.id },
        orderBy: [{ status: "asc" }, { dueDate: "asc" }],
      });
    }
  } else {
    // Staff/Admin see all
    compliance = await prisma.compliance.findMany({
      include: { client: { select: { companyName: true } } },
      orderBy: [{ dueDate: "asc" }],
      take: 100,
    });
  }

  return <ComplianceTracker compliance={compliance} isAdmin={role !== "CLIENT"} />;
}
