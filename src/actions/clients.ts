"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createClientSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  companyName: z.string().min(2),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  industry: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
});

export async function createClient(formData: FormData) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!["SUPER_ADMIN", "CA_STAFF"].includes(role)) {
    return { success: false, error: "Unauthorized" };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    password: formData.get("password"),
    companyName: formData.get("companyName"),
    gstNumber: formData.get("gstNumber") || undefined,
    panNumber: formData.get("panNumber") || undefined,
    industry: formData.get("industry") || undefined,
    address: formData.get("address") || undefined,
    city: formData.get("city") || undefined,
    state: formData.get("state") || undefined,
    pincode: formData.get("pincode") || undefined,
  };

  const parsed = createClientSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0]?.message ?? "Invalid data" };
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return { success: false, error: "A user with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      passwordHash,
      role: "CLIENT",
    },
  });

  await prisma.client.create({
    data: {
      userId: user.id,
      companyName: parsed.data.companyName,
      gstNumber: parsed.data.gstNumber,
      panNumber: parsed.data.panNumber,
      industry: parsed.data.industry,
      address: parsed.data.address,
      city: parsed.data.city,
      state: parsed.data.state,
      pincode: parsed.data.pincode,
    },
  });

  revalidatePath("/dashboard/clients");
  return { success: true };
}

export async function assignCA(clientId: string, staffId: string) {
  const session = await auth();
  if ((session?.user as any)?.role !== "SUPER_ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.client.update({
    where: { id: clientId },
    data: { assignedCAId: staffId },
  });

  revalidatePath(`/dashboard/clients/${clientId}`);
  return { success: true };
}

export async function deactivateClient(clientId: string) {
  const session = await auth();
  if ((session?.user as any)?.role !== "SUPER_ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.client.update({
    where: { id: clientId },
    data: { isActive: false },
  });

  revalidatePath("/dashboard/clients");
  return { success: true };
}
