import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MessagingInterface } from "@/components/dashboard/messaging-interface";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const session = await auth();
  const userId = session?.user?.id!;
  const role = (session?.user as any)?.role;

  // Get all conversations (unique users this user has chatted with)
  const sentMessages = await prisma.message.findMany({
    where: { senderId: userId },
    select: { receiverId: true },
    distinct: ["receiverId"],
  });
  const receivedMessages = await prisma.message.findMany({
    where: { receiverId: userId },
    select: { senderId: true },
    distinct: ["senderId"],
  });

  const contactIds = [
    ...new Set([
      ...sentMessages.map((m) => m.receiverId),
      ...receivedMessages.map((m) => m.senderId),
    ]),
  ].filter((id) => id !== userId);

  const contacts = await prisma.user.findMany({
    where: { id: { in: contactIds } },
    select: { id: true, name: true, email: true, image: true, role: true },
  });

  // Get first contact's messages by default
  const firstContactId = contacts[0]?.id ?? null;
  const initialMessages = firstContactId
    ? await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: firstContactId },
            { senderId: firstContactId, receiverId: userId },
          ],
        },
        orderBy: { createdAt: "asc" },
        take: 50,
      })
    : [];

  // For clients — find their assigned CA
  let assignedCA = null;
  if (role === "CLIENT") {
    const client = await prisma.client.findUnique({
      where: { userId },
      include: {
        assignedCA: {
          include: { user: { select: { id: true, name: true, email: true, image: true } } },
        },
      },
    });
    assignedCA = client?.assignedCA?.user ?? null;
  }

  return (
    <MessagingInterface
      currentUserId={userId}
      contacts={contacts}
      initialMessages={initialMessages}
      firstContactId={firstContactId}
      assignedCA={assignedCA}
    />
  );
}
