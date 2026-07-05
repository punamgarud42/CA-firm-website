"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error" | "warning";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastCtx {
  toast: (opts: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastCtx>({ toast: () => {} });

let _setToasts: React.Dispatch<React.SetStateAction<Toast[]>> | null = null;
let _counter = 0;

export function toast(opts: Omit<Toast, "id">) {
  if (!_setToasts) return;
  const id = `t-${++_counter}`;
  _setToasts((p) => [...p, { id, ...opts }]);
  setTimeout(() => {
    _setToasts?.((p) => p.filter((t) => t.id !== id));
  }, 4500);
}

const ICONS = {
  default: Info,
  success: CheckCircle,
  error:   AlertCircle,
  warning: AlertTriangle,
};

const COLORS = {
  default: "border-slate-200 bg-white text-slate-900",
  success: "border-green-200 bg-green-50 text-green-900",
  error:   "border-red-200 bg-red-50 text-red-900",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  _setToasts = setToasts;

  const addToast = useCallback((opts: Omit<Toast, "id">) => {
    const id = `t-${++_counter}`;
    setToasts((p) => [...p, { id, ...opts }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4500);
  }, []);

  function dismiss(id: string) {
    setToasts((p) => p.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-[999] flex flex-col gap-2 w-[360px] max-w-[calc(100vw-2rem)] pointer-events-none">
        {toasts.map((t) => {
          const v = (t.variant ?? "default") as ToastVariant;
          const Icon = ICONS[v];
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-fade-in",
                COLORS[v]
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                {t.title && <p className="font-semibold text-sm">{t.title}</p>}
                {t.description && <p className="text-sm opacity-80 mt-0.5">{t.description}</p>}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
