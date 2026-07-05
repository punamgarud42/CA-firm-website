import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StaffManager } from "@/components/dashboard/staff-manager";

export const dynamic = "force-dynamic";

export default async function StaffPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "SUPER_ADMIN") redirect("/dashboard");

  const staff = await prisma.staffMember.findMany({
    include: {
      user: { select: { id: true, name: true, email: true, phone: true, createdAt: true, isActive: true } },
      _count: { select: { assignedClients: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return <StaffManager staff={staff} />;
}
