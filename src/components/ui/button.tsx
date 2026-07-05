import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#0F172A] text-white hover:bg-[#1e293b] shadow-sm hover:shadow-md",
        primary: "bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-sm hover:shadow-md",
        gold: "bg-[#D4AF37] text-[#0F172A] hover:bg-[#c4a030] shadow-gold font-bold",
        outline: "border-2 border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white",
        ghost: "hover:bg-slate-100 text-slate-700 hover:text-slate-900",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
        link: "text-[#2563EB] underline-offset-4 hover:underline p-0 h-auto",
        white: "bg-white text-[#0F172A] hover:bg-slate-50 shadow-sm hover:shadow-md",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    // When asChild is true, return children as-is and expect parent to handle styling
    if (asChild) {
      return children;
    }
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
