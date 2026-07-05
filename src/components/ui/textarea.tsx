import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm",
            "placeholder:text-slate-400 text-slate-900",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:border-[#2563EB]",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            "transition-all duration-200 resize-none",
            error && "border-red-400",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
