"use client";
import { useState } from "react";
import { formatDate, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, HelpCircle, Plus, Edit, Eye, EyeOff } from "lucide-react";
import { publishBlogPost, toggleTestimonial } from "@/actions/cms";
import { useToast } from "@/components/ui/toast-provider";

const TABS = [
  { id: "blog", label: "Blog Posts", icon: BookOpen },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
];

export function CMSManager({ posts, testimonials, faqs }: {
  posts: any[];
  testimonials: any[];
  faqs: any[];
}) {
  const { toast } = useToast();
  const [tab, setTab] = useState("blog");
  const [toggling, setToggling] = useState<string | null>(null);

  async function handleTogglePost(id: string, published: boolean) {
    setToggling(id);
    const res = await publishBlogPost(id, !published);
    setToggling(null);
    toast({ title: res.success ? "Updated!" : "Error", variant: res.success ? "success" : "error" });
  }

  async function handleToggleTestimonial(id: string, published: boolean) {
    setToggling(id);
    const res = await toggleTestimonial(id, !published);
    setToggling(null);
    toast({ title: res.success ? "Updated!" : "Error", variant: res.success ? "success" : "error" });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">CMS Manager</h1>
          <p className="text-slate-500">Manage website content — blog, testimonials, FAQs</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="h-4 w-4" />
          {tab === "blog" ? "New Post" : tab === "testimonials" ? "Add Testimonial" : "Add FAQ"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-100 pb-0">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px",
              tab === id
                ? "border-[#2563EB] text-[#2563EB]"
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
              {id === "blog" ? posts.length : id === "testimonials" ? testimonials.length : faqs.length}
            </span>
          </button>
        ))}
      </div>

      {/* Blog Posts */}
      {tab === "blog" && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400">
                      <BookOpen className="h-8 w-8 mx-auto mb-2" />
                      No blog posts yet. Create your first post!
                    </td>
                  </tr>
                ) : (
                  posts.map((post) => (
                    <tr key={post.id}>
                      <td>
                        <p className="font-semibold text-slate-900 text-sm line-clamp-1">{post.title}</p>
                        <p className="text-xs text-slate-400">/{post.slug}</p>
                      </td>
                      <td className="text-sm text-slate-600">{post.category ?? "—"}</td>
                      <td className="text-sm text-slate-600">{post.authorName ?? "—"}</td>
                      <td className="text-xs text-slate-500">{formatDate(post.createdAt)}</td>
                      <td>
                        <span className={cn(
                          "status-badge",
                          post.isPublished ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                        )}>
                          {post.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleTogglePost(post.id, post.isPublished)}
                            loading={toggling === post.id}
                          >
                            {post.isPublished ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {/* Testimonials */}
      {tab === "testimonials" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.length === 0 ? (
            <div className="col-span-3 text-center py-16 text-slate-400">
              <Star className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>No testimonials yet</p>
            </div>
          ) : (
            testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-slate-100 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={cn("h-3.5 w-3.5", i < t.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-slate-200")} />
                    ))}
                  </div>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    t.isPublished ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                  )}>
                    {t.isPublished ? "Live" : "Hidden"}
                  </span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4">"{t.review}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.clientName}</p>
                    <p className="text-xs text-slate-400">{t.company}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleToggleTestimonial(t.id, t.isPublished)}
                    loading={toggling === t.id}
                  >
                    {t.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* FAQs */}
      {tab === "faqs" && (
        <Card>
          <CardContent className="p-0">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Category</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-400">
                      <HelpCircle className="h-8 w-8 mx-auto mb-2" />
                      No FAQs yet
                    </td>
                  </tr>
                ) : (
                  faqs.map((faq) => (
                    <tr key={faq.id}>
                      <td>
                        <p className="font-medium text-slate-900 text-sm line-clamp-1">{faq.question}</p>
                        <p className="text-xs text-slate-400 line-clamp-1">{faq.answer}</p>
                      </td>
                      <td className="text-sm text-slate-600">{faq.category ?? "—"}</td>
                      <td className="text-sm text-slate-600">{faq.order}</td>
                      <td>
                        <span className={cn(
                          "status-badge",
                          faq.isPublished ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                        )}>
                          {faq.isPublished ? "Published" : "Hidden"}
                        </span>
                      </td>
                      <td>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
