"use client";
import { useState, useRef } from "react";
import { formatDate, fileSize, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Upload, Download, Search, Filter, Folder,
  File, Trash2, Eye, Grid, List
} from "lucide-react";
import { uploadDocument } from "@/actions/documents";
import { useToast } from "@/components/ui/toast-provider";

const CATEGORIES = ["All", "GST", "INCOME_TAX", "AUDIT", "ROC", "COMPANY_DOCUMENTS", "GENERAL"];

const categoryColors: Record<string, string> = {
  GST: "bg-green-50 text-green-700",
  INCOME_TAX: "bg-blue-50 text-blue-700",
  AUDIT: "bg-purple-50 text-purple-700",
  ROC: "bg-orange-50 text-orange-700",
  COMPANY_DOCUMENTS: "bg-teal-50 text-teal-700",
  GENERAL: "bg-slate-50 text-slate-700",
};

export function DocumentManager({
  documents,
  clientId,
  isAdmin,
}: {
  documents: any[];
  clientId: string | null;
  isAdmin: boolean;
}) {
  const { toast } = useToast();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("list");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = documents.filter((d) => {
    const matchCat = category === "All" || d.category === category;
    const matchSearch =
      search === "" ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      (d.category ?? "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !clientId) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("clientId", clientId);
    formData.append("category", category === "All" ? "GENERAL" : category);

    const res = await uploadDocument(formData);
    setUploading(false);

    if (res.success) {
      toast({ title: "Document uploaded", description: `${file.name} uploaded successfully.`, variant: "success" });
    } else {
      toast({ title: "Upload failed", description: res.error, variant: "error" });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Document Manager</h1>
          <p className="text-slate-500">Securely store and manage all your financial documents</p>
        </div>
        {clientId && (
          <>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
            />
            <Button
              variant="primary"
              size="sm"
              loading={uploading}
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-4 w-4" /> Upload Document
            </Button>
          </>
        )}
      </div>

      {/* Category Folders */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {CATEGORIES.slice(1).map((cat) => {
          const count = documents.filter((d) => d.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "p-4 rounded-2xl border transition-all text-center",
                category === cat
                  ? "border-[#2563EB] bg-blue-50"
                  : "border-slate-100 bg-white hover:border-slate-200"
              )}
            >
              <Folder className={cn("h-6 w-6 mx-auto mb-1", category === cat ? "text-[#2563EB]" : "text-slate-400")} />
              <p className="text-xs font-medium text-slate-700 truncate">{cat.replace("_", " ")}</p>
              <p className="text-xs text-slate-400">{count} files</p>
            </button>
          );
        })}
      </div>

      {/* Search & Controls */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563EB]"
          />
        </div>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setView("list")}
            className={cn("p-2 rounded-lg transition-colors", view === "list" ? "bg-white shadow-sm" : "text-slate-400")}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("grid")}
            className={cn("p-2 rounded-lg transition-colors", view === "grid" ? "bg-white shadow-sm" : "text-slate-400")}
          >
            <Grid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Documents */}
      {view === "list" ? (
        <Card>
          <CardContent className="p-0">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Document</th>
                  {isAdmin && <th>Client</th>}
                  <th>Category</th>
                  <th>Size</th>
                  <th>Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="text-center py-12 text-slate-400">
                      <FileText className="h-8 w-8 mx-auto mb-2" />
                      No documents found
                    </td>
                  </tr>
                ) : (
                  filtered.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-50 rounded-lg">
                            <FileText className="h-4 w-4 text-slate-500" />
                          </div>
                          <span className="font-medium text-slate-900 text-sm">{doc.title}</span>
                        </div>
                      </td>
                      {isAdmin && <td className="text-sm">{doc.client?.companyName ?? "—"}</td>}
                      <td>
                        <span className={cn("status-badge", categoryColors[doc.category] ?? "bg-slate-50 text-slate-600")}>
                          {doc.category.replace("_", " ")}
                        </span>
                      </td>
                      <td className="text-sm text-slate-500">
                        {doc.fileSize ? fileSize(doc.fileSize) : "—"}
                      </td>
                      <td className="text-sm text-slate-500">{formatDate(doc.createdAt)}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#2563EB] transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </a>
                          <a
                            href={doc.fileUrl}
                            download
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#2563EB] transition-colors"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-card transition-all group">
              <div className="w-full h-24 bg-slate-50 rounded-xl flex items-center justify-center mb-3">
                <FileText className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-900 truncate">{doc.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{formatDate(doc.createdAt)}</p>
              <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    <Eye className="h-3 w-3" />
                  </Button>
                </a>
                <a href={doc.fileUrl} download className="flex-1">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    <Download className="h-3 w-3" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
