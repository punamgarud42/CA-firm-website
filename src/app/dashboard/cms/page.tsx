import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CMSManager } from "@/components/dashboard/cms-manager";

export const dynamic = "force-dynamic";

export default async function CMSPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (role !== "SUPER_ADMIN") redirect("/dashboard");

  const [posts, testimonials, faqs] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.fAQ.findMany({ orderBy: { order: "asc" }, take: 100 }),
  ]);

  return <CMSManager posts={posts} testimonials={testimonials} faqs={faqs} />;
}
