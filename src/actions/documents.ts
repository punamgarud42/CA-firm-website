"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createServiceClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function uploadDocument(formData: FormData) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  const file = formData.get("file") as File;
  const clientId = formData.get("clientId") as string;
  const category = (formData.get("category") as string) || "GENERAL";

  if (!file || !clientId) return { success: false, error: "Missing data" };

  // Validate file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: "File size exceeds 10MB limit" };
  }

  // Validate file type
  const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: "File type not allowed" };
  }

  try {
    const supabase = createServiceClient();
    const fileName = `${clientId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { data, error } = await supabase.storage
      .from("documents")
      .upload(fileName, file);

    if (error) return { success: false, error: error.message };

    const { data: urlData } = supabase.storage.from("documents").getPublicUrl(data.path);

    await prisma.document.create({
      data: {
        title: file.name,
        fileUrl: urlData.publicUrl,
        fileType: file.type,
        fileSize: file.size,
        category: category as any,
        clientId,
        uploadedBy: session.user?.id,
      },
    });

    revalidatePath("/dashboard/documents");
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function deleteDocument(documentId: string) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  await prisma.document.update({
    where: { id: documentId },
    data: { isActive: false },
  });

  revalidatePath("/dashboard/documents");
  return { success: true };
}
