import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, isAfter } from "date-fns";

// Merge Tailwind + clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency formatter (INR default)
export function formatCurrency(amount: number | string, currency = "INR") {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(num);
}

// Format date
export function formatDate(date: Date | string) {
  return format(new Date(date), "dd MMM yyyy");
}

// Format date + time
export function formatDateTime(date: Date | string) {
  return format(new Date(date), "dd MMM yyyy, hh:mm a");
}

// Time ago (e.g., 2 days ago)
export function timeAgo(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// Check overdue
export function isOverdue(date: Date | string) {
  return isAfter(new Date(), new Date(date));
}

// Generate invoice number
export function generateInvoiceNo() {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `INV-${year}-${random}`;
}

// Slugify text
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

// Truncate text
export function truncate(text: string, length = 100) {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

// ✅ SINGLE CLEAN VERSION (fixed)
export function getInitials(name: string) {
  return (name ?? "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Status color mapping
export function getStatusColor(status: string) {
  const map: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    OVERDUE: "bg-red-100 text-red-800",
    NEW: "bg-purple-100 text-purple-800",
    CONTACTED: "bg-blue-100 text-blue-800",
    CONVERTED: "bg-green-100 text-green-800",
    LOST: "bg-gray-100 text-gray-800",
    PAID: "bg-green-100 text-green-800",
    DRAFT: "bg-gray-100 text-gray-800",
    SENT: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-red-100 text-red-800",
    CONFIRMED: "bg-green-100 text-green-800",
    TODO: "bg-gray-100 text-gray-800",
  };

  return map[status] ?? "bg-gray-100 text-gray-800";
}

// File size formatter
export function fileSize(bytes: number) {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unit = 0;

  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit++;
  }

  return `${size.toFixed(1)} ${units[unit]}`;
}