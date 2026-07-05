import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LeadsManager } from "@/components/dashboard/leads-manager";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "SUPER_ADMIN") redirect("/dashboard");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  return <LeadsManager leads={leads} />;
}
