import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Super Admin
  const adminPassword = await bcrypt.hash("Admin@123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@taxpro.in" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@taxpro.in",
      passwordHash: adminPassword,
      role: "SUPER_ADMIN",
      phone: "+919876543210",
    },
  });
  console.log("✅ Admin created:", admin.email);

  // Create CA Staff
  const staffPassword = await bcrypt.hash("Staff@123456", 12);
  const staffUser = await prisma.user.upsert({
    where: { email: "ca.rajesh@taxpro.in" },
    update: {},
    create: {
      name: "CA Rajesh Kumar",
      email: "ca.rajesh@taxpro.in",
      passwordHash: staffPassword,
      role: "CA_STAFF",
      phone: "+919876543211",
    },
  });

  const staff = await prisma.staffMember.upsert({
    where: { userId: staffUser.id },
    update: {},
    create: {
      userId: staffUser.id,
      designation: "Senior CA",
      department: "Tax & Compliance",
      expertise: ["GST", "Income Tax", "Audit"],
    },
  });
  console.log("✅ CA Staff created:", staffUser.email);

  // Create Demo Client
  const clientPassword = await bcrypt.hash("Client@123456", 12);
  const clientUser = await prisma.user.upsert({
    where: { email: "client@techventures.in" },
    update: {},
    create: {
      name: "Amit Sharma",
      email: "client@techventures.in",
      passwordHash: clientPassword,
      role: "CLIENT",
      phone: "+919876543212",
    },
  });

  const client = await prisma.client.upsert({
    where: { userId: clientUser.id },
    update: {},
    create: {
      userId: clientUser.id,
      companyName: "TechVentures Pvt Ltd",
      gstNumber: "29AABCT1332L1ZN",
      panNumber: "AABCT1332L",
      assignedCAId: staff.id,
      industry: "Technology",
      city: "Bangalore",
      state: "Karnataka",
    },
  });
  console.log("✅ Demo client created:", clientUser.email);

  // Create Compliance Items
  const complianceItems = [
    { type: "GST_MONTHLY_RETURN", desc: "GSTR-3B for October 2024", days: -10, status: "OVERDUE" },
    { type: "GST_GSTR1", desc: "GSTR-1 for November 2024", days: 5, status: "PENDING" },
    { type: "ADVANCE_TAX", desc: "Q3 Advance Tax (Dec 15)", days: 10, status: "PENDING" },
    { type: "TDS_RETURN", desc: "TDS Return Q2 Form 26Q", days: 15, status: "IN_PROGRESS" },
    { type: "INCOME_TAX_RETURN", desc: "ITR-6 Filing FY 2023-24", days: -30, status: "COMPLETED" },
    { type: "ROC_AOC4", desc: "AOC-4 Annual Filing", days: 20, status: "PENDING" },
    { type: "ROC_MGT7", desc: "MGT-7 Annual Return", days: 25, status: "PENDING" },
    { type: "AUDIT_REPORT", desc: "Tax Audit Report 3CA/3CB", days: -45, status: "COMPLETED" },
  ];

  for (const item of complianceItems) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + item.days);
    await prisma.compliance.create({
      data: {
        clientId: client.id,
        complianceType: item.type,
        description: item.desc,
        dueDate,
        status: item.status as any,
        completedAt: item.status === "COMPLETED" ? new Date() : null,
      },
    });
  }
  console.log("✅ Compliance items created");

  // Create Tasks
  const tasks = [
    { title: "Upload Q3 bank statements", desc: "Please upload all bank statements for July-September 2024", status: "TODO", priority: "HIGH", days: 5 },
    { title: "Provide GST credit ledger", desc: "Export and share GST credit ledger from the GSTN portal", status: "IN_PROGRESS", priority: "MEDIUM", days: 3 },
    { title: "Sign audit report", desc: "Review and digitally sign the tax audit report", status: "TODO", priority: "URGENT", days: 2 },
    { title: "Advance tax payment", desc: "Transfer ₹85,000 towards Q3 advance tax by December 15", status: "COMPLETED", priority: "HIGH", days: -5 },
  ];

  for (const task of tasks) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + task.days);
    await prisma.task.create({
      data: {
        clientId: client.id,
        title: task.title,
        description: task.desc,
        status: task.status as any,
        priority: task.priority,
        dueDate,
        createdById: staff.id,
      },
    });
  }
  console.log("✅ Tasks created");

  // Create Invoice
  await prisma.invoice.create({
    data: {
      invoiceNo: "INV-2024-1001",
      clientId: client.id,
      amount: 25000,
      gstAmount: 4500,
      totalAmount: 29500,
      status: "PAID",
      paidAt: new Date(),
      description: "GST Filing & ROC Compliance Services - Q3 FY24-25",
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNo: "INV-2024-1002",
      clientId: client.id,
      amount: 15000,
      gstAmount: 2700,
      totalAmount: 17700,
      status: "SENT",
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      description: "Income Tax Return Filing FY 2024-25",
    },
  });
  console.log("✅ Invoices created");

  // Create Sample Leads
  const leads = [
    { name: "Vikram Mehta", email: "vikram@startup.io", phone: "9876543200", company: "StartupIO", service: "Company Registration", status: "NEW" },
    { name: "Sunita Rao", email: "sunita@msme.in", phone: "9876543201", company: "MSME Solutions", service: "GST Registration & Returns", status: "CONTACTED" },
    { name: "Arun Kapoor", email: "arun@exports.com", company: "Kapoor Exports", service: "NRI Taxation", status: "CONVERTED" },
    { name: "Ritu Bansal", email: "ritu@retail.com", company: "Bansal Retail", service: "Accounting & Bookkeeping", status: "NEW" },
  ];

  for (const lead of leads) {
    await prisma.lead.create({ data: { ...lead, status: lead.status as any, source: "WEBSITE" } });
  }
  console.log("✅ Sample leads created");

  // Create FAQs
  await prisma.fAQ.createMany({
    data: [
      { question: "How long does company registration take?", answer: "A private limited company registration typically takes 5-7 working days through MCA.", category: "Company Law", order: 1 },
      { question: "What are the GST filing due dates?", answer: "GSTR-1 is due by 11th and GSTR-3B by 20th of each month for monthly filers.", category: "GST", order: 2 },
    ],
    skipDuplicates: true,
  });
  console.log("✅ FAQs created");

  // Create Appointment
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(11, 0, 0, 0);

  await prisma.appointment.create({
    data: {
      clientId: client.id,
      title: "Q3 Tax Review Meeting",
      description: "Review Q3 financials and plan advance tax payment",
      scheduledAt: tomorrow,
      status: "CONFIRMED",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
  });
  console.log("✅ Appointment created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("\n📋 Demo Credentials:");
  console.log("   Admin:  admin@taxpro.in / Admin@123456");
  console.log("   Staff:  ca.rajesh@taxpro.in / Staff@123456");
  console.log("   Client: client@techventures.in / Client@123456");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
