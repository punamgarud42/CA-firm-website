import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppointmentBooking } from "@/components/dashboard/appointment-booking";

export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const role = (session?.user as any)?.role;

  let appointments: any[] = [];
  let clientId: string | null = null;

  if (role === "CLIENT") {
    const client = await prisma.client.findUnique({ where: { userId } });
    if (client) {
      clientId = client.id;
      appointments = await prisma.appointment.findMany({
        where: { clientId: client.id },
        orderBy: { scheduledAt: "desc" },
      });
    }
  } else {
    appointments = await prisma.appointment.findMany({
      include: { client: { select: { companyName: true } } },
      orderBy: { scheduledAt: "desc" },
      take: 100,
    });
  }

  return (
    <AppointmentBooking
      appointments={appointments}
      clientId={clientId}
      isAdmin={role !== "CLIENT"}
    />
  );
}
