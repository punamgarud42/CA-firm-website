import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.metaTitle ?? post.title,
      description: post.metaDesc ?? post.excerpt ?? undefined,
      openGraph: {
        title: post.title,
        description: post.excerpt ?? undefined,
        images: post.coverImage ? [{ url: post.coverImage }] : [],
      },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  let post: any = null;

  try {
    post = await prisma.blogPost.findUnique({
      where: { slug: params.slug, isPublished: true },
    });
  } catch {
    // DB not connected — show sample content
  }

  // Sample post for demo (when DB is not set up)
  if (!post) {
    const samplePosts: Record<string, any> = {
      "gst-rate-changes-2024": {
        title: "GST Rate Changes 2024-25: What Businesses Need to Know",
        content: `The GST Council has made several significant rate changes that affect businesses across sectors.\n\n## Key Changes\n\nThe council revised rates for multiple categories in its latest meeting. Here are the most important updates:\n\n**Food & Beverages**: Several packaged food items have seen rate revisions. Restaurants and food service businesses should update their billing systems accordingly.\n\n**Manufacturing Sector**: The input tax credit mechanism has been streamlined, providing better working capital management for manufacturers.\n\n**E-Commerce**: New compliance requirements for e-commerce operators have been introduced to ensure better tax compliance across the sector.\n\n## Action Required\n\n1. Update your accounting software with new rates\n2. Review ITC reconciliation procedures\n3. Train your accounts team on the changes\n4. File revised returns if required\n\n## Conclusion\n\nThe changes are designed to simplify the GST structure and reduce cascading taxes. Businesses should work with their CA to understand the full impact on their specific operations.\n\nFor personalized guidance on how these changes affect your business, contact TaxPro CA Firm.`,
        category: "GST Updates",
        authorName: "CA Priya Sharma",
        publishedAt: new Date("2024-12-15"),
        tags: ["GST", "Tax Updates", "Business Compliance"],
      },
    };

    post = samplePosts[params.slug];
    if (!post) notFound();
  }

  const related = [];
  try {
    const relatedPosts = await prisma.blogPost.findMany({
      where: { isPublished: true, category: post.category, slug: { not: params.slug } },
      select: { id: true, title: true, slug: true, publishedAt: true, category: true },
      take: 3,
    });
    related.push(...relatedPosts);
  } catch { /* ignore */ }

  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="bg-gradient-hero py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          {post.category && (
            <span className="inline-block bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            {post.authorName && (
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> {post.authorName}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Article Content */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm prose prose-slate max-w-none
              prose-headings:font-black prose-headings:text-[#0F172A]
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-4
              prose-strong:text-slate-900 prose-strong:font-bold
              prose-li:text-slate-600 prose-ul:space-y-1
              prose-a:text-[#2563EB] prose-a:no-underline hover:prose-a:underline">
              {post.content.split("\n\n").map((para: string, i: number) => {
                if (para.startsWith("## ")) {
                  return <h2 key={i} className="text-2xl font-black text-[#0F172A] mt-8 mb-4">{para.slice(3)}</h2>;
                }
                if (para.startsWith("### ")) {
                  return <h3 key={i} className="text-xl font-bold text-slate-900 mt-6 mb-3">{para.slice(4)}</h3>;
                }
                if (para.startsWith("**") && para.endsWith("**")) {
                  return <p key={i} className="font-bold text-slate-900 mb-2">{para.slice(2, -2)}</p>;
                }
                if (para.match(/^\d+\./)) {
                  const items = para.split("\n").filter(Boolean);
                  return (
                    <ol key={i} className="list-decimal pl-6 space-y-1 mb-4">
                      {items.map((item, j) => <li key={j} className="text-slate-600">{item.replace(/^\d+\.\s/, "")}</li>)}
                    </ol>
                  );
                }
                return <p key={i} className="text-slate-600 leading-relaxed mb-4">{para}</p>;
              })}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1.5 rounded-full">
                    <Tag className="h-3 w-3" /> {tag}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1e3a8a] rounded-2xl p-6 text-white sticky top-24">
              <h3 className="font-black text-lg mb-2">Need Expert Help?</h3>
              <p className="text-white/70 text-sm mb-4">
                Our CAs can help you navigate complex tax situations with ease.
              </p>
              <Link
                href="/contact"
                className="block w-full bg-[#D4AF37] text-[#0F172A] text-sm font-bold px-4 py-3 rounded-xl text-center hover:bg-[#c4a030] transition-colors"
              >
                Book Free Consultation
              </Link>
              <a
                href="https://wa.me/919876543210"
                className="block w-full mt-3 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-3 rounded-xl text-center hover:bg-white/20 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h3 className="font-bold text-slate-900 mb-4">Related Articles</h3>
                <div className="space-y-3">
                  {related.map((rp: any) => (
                    <Link key={rp.id} href={`/blog/${rp.slug}`} className="block group">
                      <p className="text-sm font-medium text-slate-800 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                        {rp.title}
                      </p>
                      {rp.publishedAt && <p className="text-xs text-slate-400 mt-0.5">{formatDate(rp.publishedAt)}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
