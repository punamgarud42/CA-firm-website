"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Resend } from "resend";

const leadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
});

export async function submitContactForm(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    service: formData.get("service"),
    message: formData.get("message"),
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data. Please check your inputs." };
  }

  try {
    await prisma.lead.create({
      data: {
        ...parsed.data,
        source: "WEBSITE",
        status: "NEW",
      },
    });

    // Send notification email
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "noreply@taxpro.in",
        to: "info@taxpro.in",
        subject: `New Lead: ${parsed.data.name} - ${parsed.data.service ?? "General Inquiry"}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${parsed.data.name}</p>
          <p><strong>Email:</strong> ${parsed.data.email}</p>
          <p><strong>Phone:</strong> ${parsed.data.phone ?? "—"}</p>
          <p><strong>Company:</strong> ${parsed.data.company ?? "—"}</p>
          <p><strong>Service:</strong> ${parsed.data.service ?? "—"}</p>
          <p><strong>Message:</strong> ${parsed.data.message ?? "—"}</p>
        `,
      });
    }

    return { success: true };
  } catch (e: any) {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateLeadStatus(leadId: string, status: string) {
  await prisma.lead.update({
    where: { id: leadId },
    data: { status: status as any },
  });
  return { success: true };
}
