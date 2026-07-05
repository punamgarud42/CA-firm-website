import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DocumentManager } from "@/components/dashboard/document-manager";

export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const role = (session?.user as any)?.role;

  let documents: any[] = [];
  let clientId: string | null = null;

  if (role === "CLIENT") {
    const client = await prisma.client.findUnique({ where: { userId } });
    if (client) {
      clientId = client.id;
      documents = await prisma.document.findMany({
        where: { clientId: client.id, isActive: true },
        orderBy: { createdAt: "desc" },
      });
    }
  } else {
    documents = await prisma.document.findMany({
      where: { isActive: true },
      include: { client: { select: { companyName: true } } },
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  }

  return (
    <DocumentManager
      documents={documents}
      clientId={clientId}
      isAdmin={role !== "CLIENT"}
    />
  );
}
