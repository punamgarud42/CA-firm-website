"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";
import { z } from "zod";

export async function publishBlogPost(id: string, publish: boolean) {
  const session = await auth();
  if ((session?.user as any)?.role !== "SUPER_ADMIN") return { success: false, error: "Unauthorized" };

  await prisma.blogPost.update({
    where: { id },
    data: { isPublished: publish, publishedAt: publish ? new Date() : null },
  });
  revalidatePath("/blog");
  revalidatePath("/dashboard/cms");
  return { success: true };
}

export async function toggleTestimonial(id: string, publish: boolean) {
  const session = await auth();
  if ((session?.user as any)?.role !== "SUPER_ADMIN") return { success: false, error: "Unauthorized" };

  await prisma.testimonial.update({ where: { id }, data: { isPublished: publish } });
  revalidatePath("/");
  revalidatePath("/dashboard/cms");
  return { success: true };
}

const postSchema = z.object({
  title: z.string().min(5).max(300),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(50),
  category: z.string().optional(),
  tags: z.string().optional(),
  metaTitle: z.string().max(70).optional(),
  metaDesc: z.string().max(160).optional(),
});

export async function createBlogPost(formData: FormData) {
  const session = await auth();
  if ((session?.user as any)?.role !== "SUPER_ADMIN") return { success: false, error: "Unauthorized" };

  const raw = {
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    category: formData.get("category"),
    tags: formData.get("tags"),
    metaTitle: formData.get("metaTitle"),
    metaDesc: formData.get("metaDesc"),
  };

  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0]?.message };

  const slug = slugify(parsed.data.title);
  await prisma.blogPost.create({
    data: {
      ...parsed.data,
      slug,
      tags: parsed.data.tags ? parsed.data.tags.split(",").map((t) => t.trim()) : [],
      authorId: session.user?.id,
      authorName: session.user?.name,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/dashboard/cms");
  return { success: true };
}
