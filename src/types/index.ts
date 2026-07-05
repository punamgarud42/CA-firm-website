// Shared TypeScript types across the application

export type UserRole = "SUPER_ADMIN" | "CA_STAFF" | "CLIENT";

export type ComplianceStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "OVERDUE";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export type AppointmentStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

export type LeadStatus = "NEW" | "CONTACTED" | "CONVERTED" | "LOST";

export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";

export type DocumentCategory =
  | "GST"
  | "INCOME_TAX"
  | "AUDIT"
  | "ROC"
  | "COMPANY_DOCUMENTS"
  | "GENERAL";

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
}

export interface ApiResponse<T = null> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DashboardStats {
  totalClients: number;
  activeLeads: number;
  pendingCompliance: number;
  monthlyRevenue: number;
}
