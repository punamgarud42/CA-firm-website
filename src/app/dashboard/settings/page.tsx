import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SettingsPage } from "@/components/dashboard/settings-page";

export const dynamic = "force-dynamic";

export default async function Settings() {
  const session = await auth();
  const userId = session?.user?.id!;
  const role = (session?.user as any)?.role;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, phone: true, image: true, role: true, createdAt: true },
  });

  let clientProfile = null;
  if (role === "CLIENT") {
    clientProfile = await prisma.client.findUnique({
      where: { userId },
      select: {
        id: true, companyName: true, gstNumber: true, panNumber: true,
        address: true, city: true, state: true, pincode: true, industry: true,
      },
    });
  }

  return <SettingsPage user={user} clientProfile={clientProfile} />;
}
