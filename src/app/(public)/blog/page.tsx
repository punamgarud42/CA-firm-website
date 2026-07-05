import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate, truncate } from "@/lib/utils";
import { BookOpen, ArrowRight, Calendar, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Tax Updates, GST News & Business Finance",
  description: "Stay updated with the latest tax news, GST updates, startup guides, and compliance tips from TaxPro CA Firm.",
};

const CATEGORIES = ["All", "Tax Updates", "GST Updates", "Startup Guides", "Compliance Guides", "Business Finance"];

const SAMPLE_POSTS = [
  { id: "1", title: "GST Rate Changes 2024-25: What Businesses Need to Know", slug: "gst-rate-changes-2024", excerpt: "The GST Council's latest notifications bring significant changes to tax rates for several sectors. Here's a comprehensive breakdown of what's changing and how it affects your business.", category: "GST Updates", publishedAt: new Date("2024-12-15"), authorName: "CA Priya Sharma", readTime: "5 min read" },
  { id: "2", title: "Complete Guide to Section 80C Deductions for FY 2024-25", slug: "section-80c-guide-2024", excerpt: "Maximize your tax savings with our comprehensive guide to Section 80C. Learn about all eligible investments, limits, and strategies to reduce your taxable income.", category: "Tax Updates", publishedAt: new Date("2024-12-10"), authorName: "CA Rajesh Gupta", readTime: "8 min read" },
  { id: "3", title: "How to Get DPIIT Startup Recognition: Step-by-Step Guide", slug: "dpiit-startup-recognition-guide", excerpt: "DPIIT recognition opens doors to tax exemptions, easier fundraising, and government benefits. This step-by-step guide walks you through the entire process.", category: "Startup Guides", publishedAt: new Date("2024-12-05"), authorName: "CA Neha Patel", readTime: "10 min read" },
  { id: "4", title: "ROC Compliance Calendar 2025: All Important Deadlines", slug: "roc-compliance-calendar-2025", excerpt: "Never miss an ROC filing deadline again. Our comprehensive 2025 compliance calendar covers all important MCA filing due dates for private limited companies and LLPs.", category: "Compliance Guides", publishedAt: new Date("2024-11-28"), authorName: "CA Amit Joshi", readTime: "6 min read" },
  { id: "5", title: "Advance Tax Payment: Who Needs to Pay and How to Calculate", slug: "advance-tax-calculation-guide", excerpt: "Understanding advance tax is crucial to avoid interest penalties. Learn who needs to pay, how to calculate liability, and the installment schedule for FY 2024-25.", category: "Tax Updates", publishedAt: new Date("2024-11-20"), authorName: "CA Rajesh Gupta", readTime: "7 min read" },
  { id: "6", title: "NRI Taxation in India: Complete Guide for FY 2024-25", slug: "nri-taxation-guide-2024", excerpt: "NRI taxation rules in India can be complex. This guide covers residency determination, taxable income, DTAA benefits, and repatriation of funds.", category: "Tax Updates", publishedAt: new Date("2024-11-15"), authorName: "CA Neha Patel", readTime: "12 min read" },
];

export default async function BlogPage() {
  // Try to get published posts from DB, fall back to sample posts
  let posts: typeof SAMPLE_POSTS = SAMPLE_POSTS;
  try {
    const dbPosts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 20,
    });
    if (dbPosts.length > 0) {
      posts = dbPosts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt ?? "",
        category: p.category ?? "General",
        publishedAt: p.publishedAt ?? p.createdAt,
        authorName: p.authorName ?? "TaxPro Team",
        readTime: "5 min read",
      }));
    }
  } catch { /* DB not connected, use sample */ }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-gradient-hero py-20 px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl" />
          </div>
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Tax Insights & Business Guides
            </h1>
            <p className="text-xl text-white/80">
              Expert articles on taxation, compliance, and business finance — written by our CAs
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Category filter */}
        <div className="flex gap-3 flex-wrap mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1e3a8a] rounded-2xl p-8 md:p-12 mb-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full filter blur-3xl" />
            </div>
            <div className="relative max-w-3xl">
              <span className="inline-block bg-[#D4AF37] text-[#0F172A] text-xs font-bold px-3 py-1 rounded-full mb-4">
                Featured
              </span>
              <h2 className="text-3xl font-black mb-4 leading-tight">{featured.title}</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {truncate(featured.excerpt ?? "", 200)}
              </p>
              <div className="flex items-center gap-4 text-white/60 text-sm mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(featured.publishedAt)}
                </span>
                <span>By {featured.authorName}</span>
                <span>{featured.readTime}</span>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0F172A] font-bold px-6 py-3 rounded-xl hover:bg-[#c4a030] transition-colors"
              >
                Read Article <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-slate-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight mb-3 group-hover:text-[#2563EB] transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
                  {truncate(post.excerpt ?? "", 150)}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-[#2563EB] hover:gap-2.5 flex items-center gap-1.5 transition-all"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
