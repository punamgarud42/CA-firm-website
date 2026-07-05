import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { InvoiceManager } from "@/components/dashboard/invoice-manager";

export const dynamic = "force-dynamic";

export default async function InvoicesPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const role = (session?.user as any)?.role;

  let invoices: any[] = [];

  if (role === "CLIENT") {
    const client = await prisma.client.findUnique({ where: { userId } });
    if (client) {
      invoices = await prisma.invoice.findMany({
        where: { clientId: client.id },
        orderBy: { createdAt: "desc" },
      });
    }
  } else {
    invoices = await prisma.invoice.findMany({
      include: { client: { select: { companyName: true } } },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  }

  return <InvoiceManager invoices={invoices} isAdmin={role !== "CLIENT"} />;
}
