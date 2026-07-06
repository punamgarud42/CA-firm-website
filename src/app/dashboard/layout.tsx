import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/auth/login");

  return (
    <div className="flex flex-col h-screen md:flex-row bg-[#F8FAFC] overflow-hidden">
      <DashboardSidebar role={(session.user as any)?.role ?? "CLIENT"} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={session.user as any} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
