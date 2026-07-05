import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NewClientForm } from "@/components/dashboard/new-client-form";

export default async function NewClientPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!["SUPER_ADMIN", "CA_STAFF"].includes(role)) redirect("/dashboard");

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-900">Add New Client</h1>
        <p className="text-slate-500">Create a new client profile and portal access</p>
      </div>
      <NewClientForm />
    </div>
  );
}
