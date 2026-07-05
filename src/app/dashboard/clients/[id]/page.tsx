import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ClientDetail } from "@/components/dashboard/client-detail";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!["SUPER_ADMIN", "CA_STAFF"].includes(role)) redirect("/dashboard");

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, phone: true, createdAt: true } },
      assignedCA: { include: { user: { select: { name: true, email: true } } } },
      compliance: { orderBy: { dueDate: "asc" }, take: 10 },
      tasks: { orderBy: { dueDate: "asc" }, take: 10 },
      documents: { where: { isActive: true }, orderBy: { createdAt: "desc" }, take: 10 },
      appointments: { orderBy: { scheduledAt: "desc" }, take: 5 },
      invoices: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!client) notFound();

  const staffList = await prisma.staffMember.findMany({
    include: { user: { select: { id: true, name: true } } },
  });

  return <ClientDetail client={client} staffList={staffList} />;
}
