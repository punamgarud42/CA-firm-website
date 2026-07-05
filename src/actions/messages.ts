"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const messageSchema = z.object({
  receiverId: z.string().min(1),
  content: z.string().min(1).max(5000),
});

export async function sendMessage(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, error: "Unauthorized" };

  const raw = {
    receiverId: formData.get("receiverId"),
    content: formData.get("content"),
  };

  const parsed = messageSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: "Invalid message." };

  // Prevent sending to self
  if (parsed.data.receiverId === session.user.id) {
    return { success: false, error: "Cannot send message to yourself." };
  }

  await prisma.message.create({
    data: {
      senderId: session.user.id,
      receiverId: parsed.data.receiverId,
      content: parsed.data.content,
    },
  });

  revalidatePath("/dashboard/messages");
  return { success: true };
}

export async function markMessagesRead(senderId: string, receiverId: string) {
  await prisma.message.updateMany({
    where: { senderId, receiverId, isRead: false },
    data: { isRead: true },
  });
  return { success: true };
}

export async function getConversation(userId: string, contactId: string) {
  return prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: contactId },
        { senderId: contactId, receiverId: userId },
      ],
    },
    orderBy: { createdAt: "asc" },
    take: 100,
  });
}
