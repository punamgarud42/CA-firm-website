import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TasksBoard } from "@/components/dashboard/tasks-board";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const role = (session?.user as any)?.role;

  let tasks: any[] = [];

  if (role === "CLIENT") {
    const client = await prisma.client.findUnique({ where: { userId } });
    if (client) {
      tasks = await prisma.task.findMany({
        where: { clientId: client.id },
        orderBy: [{ status: "asc" }, { dueDate: "asc" }],
      });
    }
  } else {
    tasks = await prisma.task.findMany({
      include: { client: { select: { companyName: true } } },
      orderBy: [{ dueDate: "asc" }],
      take: 200,
    });
  }

  return <TasksBoard tasks={tasks} isAdmin={role !== "CLIENT"} />;
}
