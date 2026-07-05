import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClientsTable } from "@/components/dashboard/clients-table";

export const dynamic = "force-dynamic";

export default async function ClientsPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!["SUPER_ADMIN", "CA_STAFF"].includes(role)) redirect("/dashboard");

  const clients = await prisma.client.findMany({
    include: {
      user: { select: { name: true, email: true, phone: true, createdAt: true } },
      assignedCA: { include: { user: { select: { name: true } } } },
      _count: { select: { compliance: true, documents: true, tasks: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  const staffList = await prisma.staffMember.findMany({
    include: { user: { select: { id: true, name: true } } },
  });

  return <ClientsTable clients={clients} staffList={staffList} />;
}
