"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const userId = formData.get("userId") as string;
  if (userId !== session.user?.id && (session.user as any)?.role !== "SUPER_ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const schema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
  });

  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };

  await prisma.user.update({
    where: { id: userId },
    data: parsed.data,
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}

export async function updateClientProfile(formData: FormData) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const clientId = formData.get("clientId") as string;

  await prisma.client.update({
    where: { id: clientId },
    data: {
      companyName: formData.get("companyName") as string,
      gstNumber: (formData.get("gstNumber") as string) || null,
      panNumber: (formData.get("panNumber") as string) || null,
      industry: (formData.get("industry") as string) || null,
      address: (formData.get("address") as string) || null,
      city: (formData.get("city") as string) || null,
      state: (formData.get("state") as string) || null,
      pincode: (formData.get("pincode") as string) || null,
    },
  });

  revalidatePath("/dashboard/settings");
  return { success: true };
}
