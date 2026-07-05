"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Something went wrong</h1>
        <p className="text-slate-500 mb-8">
          An unexpected error occurred. Please try again or contact support if the issue persists.
        </p>
        {error.digest && (
          <p className="text-xs text-slate-400 mb-6">
            Error ID: <code className="bg-slate-100 px-1 rounded">{error.digest}</code>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
