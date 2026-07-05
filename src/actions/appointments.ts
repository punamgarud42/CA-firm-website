"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const appointmentSchema = z.object({
  clientId: z.string(),
  title: z.string().min(2).max(200),
  description: z.string().optional(),
  scheduledAt: z.string(),
});

export async function bookAppointment(formData: FormData) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const raw = {
    clientId: formData.get("clientId"),
    title: formData.get("title"),
    description: formData.get("description"),
    scheduledAt: formData.get("scheduledAt"),
  };

  const parsed = appointmentSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: "Invalid data provided." };

  try {
    await prisma.appointment.create({
      data: {
        clientId: parsed.data.clientId,
        title: parsed.data.title,
        description: parsed.data.description,
        scheduledAt: new Date(parsed.data.scheduledAt),
        status: "PENDING",
      },
    });

    revalidatePath("/dashboard/appointments");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function updateAppointmentStatus(id: string, status: string, meetingLink?: string) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  await prisma.appointment.update({
    where: { id },
    data: { status: status as any, meetingLink },
  });

  revalidatePath("/dashboard/appointments");
  return { success: true };
}

export async function cancelAppointment(id: string) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  await prisma.appointment.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/dashboard/appointments");
  return { success: true };
}
