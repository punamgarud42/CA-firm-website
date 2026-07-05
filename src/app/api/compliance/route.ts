import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  clientId: z.string(),
  complianceType: z.string(),
  description: z.string().optional(),
  dueDate: z.string(),
  periodFrom: z.string().optional(),
  periodTo: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  if (!clientId) return NextResponse.json({ error: "clientId required" }, { status: 400 });

  const items = await prisma.compliance.findMany({
    where: { clientId },
    orderBy: { dueDate: "asc" },
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!session || !["SUPER_ADMIN", "CA_STAFF"].includes(role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const item = await prisma.compliance.create({
    data: {
      ...parsed.data,
      dueDate: new Date(parsed.data.dueDate),
      periodFrom: parsed.data.periodFrom ? new Date(parsed.data.periodFrom) : undefined,
      periodTo: parsed.data.periodTo ? new Date(parsed.data.periodTo) : undefined,
    },
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!session || !["SUPER_ADMIN", "CA_STAFF"].includes(role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, status } = body;
  if (!id || !status) return NextResponse.json({ error: "id and status required" }, { status: 400 });

  const updated = await prisma.compliance.update({
    where: { id },
    data: {
      status,
      completedAt: status === "COMPLETED" ? new Date() : undefined,
    },
  });

  return NextResponse.json(updated);
}
