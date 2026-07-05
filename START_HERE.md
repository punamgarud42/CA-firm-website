# 🚀 START HERE - Get Running in 5 Minutes

## Copy & Paste These Commands

### 1. Open Terminal in Project Folder

```powershell
cd "E:\website\CA firm\ca-firm-platform"
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

**This will take 2-3 minutes.** (Grab a coffee ☕)

---

## Database Setup

### Option A: Supabase (Recommended - Free)

1. **Create Free Account**
   - Go to: https://supabase.com
   - Click "Start your project"
   - Sign up with email or GitHub

2. **Create New Project**
   - Click "New Project"
   - Name: `ca-firm-db` (or anything)
   - Region: Closest to you
   - Click "Create new project" (takes ~2 min)

3. **Get Connection String**
   - In Supabase dashboard, click **Settings** (bottom left)
   - Click **Database**
   - Scroll down to "Connection strings"
   - Copy the **PostgreSQL** connection string
   - It looks like: `postgresql://postgres:password@db.project.supabase.co:5432/postgres`

4. **Create `.env.local` File**

   Create a new file in the project root called `.env.local` with:

   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_PROJECT_ID.supabase.co:5432/postgres"
   AUTH_SECRET="super-secret-key-minimum-32-characters-long-abcde"
   AUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_ANON_KEY"
   SUPABASE_SERVICE_ROLE_KEY="YOUR_SERVICE_ROLE_KEY"
   ```

   **Where to find these values in Supabase:**
   - `YOUR_PROJECT_ID`: From your project URL (e.g., `xyabcd123`)
   - `YOUR_PASSWORD`: You set this when creating the project
   - `YOUR_ANON_KEY`: Settings → API → anon (public) key
   - `YOUR_SERVICE_ROLE_KEY`: Settings → API → service_role (secret) key

### Option B: Local PostgreSQL

1. **Install PostgreSQL**
   - Download: https://www.postgresql.org/download/windows/
   - During install, remember the password you set

2. **Create Database**
   ```bash
   psql -U postgres
   CREATE DATABASE ca_firm_db;
   \q
   ```

3. **Create `.env.local` File**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/ca_firm_db"
   AUTH_SECRET="super-secret-key-minimum-32-characters-long-abcde"
   AUTH_URL="http://localhost:3000"
   ```

---

## Initialize Database

Run these commands in sequence:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

This will:
- Generate Prisma client
- Create all database tables
- Seed with demo data (accounts, clients, compliance items)

---

## Start Development Server

```bash
npm run dev
```

**Wait for:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

Then open: **http://localhost:3000**

---

## Login with Demo Accounts

After seeding, use any of these:

```
Admin Account:
Email:    admin@taxpro.in
Password: Admin@123456

CA Staff Account:
Email:    ca.rajesh@taxpro.in
Password: Staff@123456

Client Account:
Email:    client@techventures.in
Password: Client@123456
```

---

## What You'll See

### At `http://localhost:3000`

**Public Pages:**
- `/` — Homepage (hero, services, testimonials)
- `/about` — About the firm
- `/services` — All services listed
- `/services/income-tax` — Individual service pages
- `/blog` — Blog posts
- `/faq` — Frequently asked questions
- `/contact` — Contact form
- `/auth/login` — Login page

**Client Portal (after login):**
- `/dashboard` — Compliance overview
- `/dashboard/compliance` — Tracker for GST, ITR, etc.
- `/dashboard/documents` — File uploads & management
- `/dashboard/tasks` — Task list
- `/dashboard/appointments` — Book meetings
- `/dashboard/messages` — Chat with CA
- `/dashboard/invoices` — Payment history
- `/dashboard/ai-assistant` — Tax Q&A bot

**Admin Dashboard (with admin account):**
- `/dashboard` (admin view) — Metrics & stats
- `/dashboard/clients` — Manage all clients
- `/dashboard/leads` — Leads from contact forms
- `/dashboard/staff` — Manage team
- `/dashboard/compliance` — View all compliance items
- `/dashboard/analytics` — Reports & charts
- `/dashboard/cms` — Edit blog, testimonials, content

---

## Troubleshooting

### Error: "Cannot find module 'next'"

```bash
npm install --legacy-peer-deps
npm run db:generate
```

### Error: "Database connection failed"

1. Check your `.env.local` file exists
2. Verify `DATABASE_URL` is correct
3. For Supabase, make sure you copied the **PostgreSQL** connection string
4. For local DB, make sure PostgreSQL is running

### Error: "Port 3000 already in use"

```bash
npm run dev -- -p 3001
```

Then open: http://localhost:3001

### Error: "Prisma type errors"

```bash
npm run db:generate
npm run db:push
```

### OAuth/Google Sign-in Not Working

That's optional for now. You can use email/password login.

To enable Google OAuth:
1. Go to: https://console.cloud.google.com
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add `http://localhost:3000/api/auth/callback/google` as authorized redirect
6. Add credentials to `.env.local`:
   ```env
   AUTH_GOOGLE_ID="your-client-id"
   AUTH_GOOGLE_SECRET="your-client-secret"
   ```

---

## Next Steps

1. ✅ Explore the platform
2. ✅ Test login with all 3 accounts
3. ✅ Check out the admin dashboard
4. ✅ Upload a document
5. ✅ Create a task
6. ✅ Send a message
7. ✅ Try the AI assistant

### When Ready to Deploy

See: **DEPLOYMENT.md**

### For Detailed Setup & Troubleshooting

See: **RUN_GUIDE.md**

### Platform Overview

See: **SETUP_COMPLETE.md**

---

## Commands Cheat Sheet

```bash
# Install dependencies
npm install --legacy-peer-deps

# Database
npm run db:generate    # Generate Prisma types
npm run db:push        # Create tables
npm run db:seed        # Add demo data
npm run db:studio      # Visual database browser
npm run db:migrate     # Create new migration

# Development
npm run dev            # Start dev server
npm run lint           # Check code
npm run build          # Build for production
npm run start          # Start production server
```

---

## File Structure Quick Reference

```
E:\website\CA firm\ca-firm-platform\
├── src/
│   ├── app/                  # Pages & layouts
│   ├── components/           # React components
│   ├── actions/              # Server actions
│   ├── lib/                  # Config & utilities
│   └── ...
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Demo data
├── .env.local                # Your environment (CREATE THIS)
├── .env.example              # Template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Styling config
└── ...
```

---

## Technology Stack

```
Frontend:  Next.js 14 + React 18 + TypeScript + Tailwind CSS
Backend:   Next.js Server Actions + Route Handlers
Database:  PostgreSQL + Prisma ORM
Auth:      NextAuth v5 + Google OAuth
Storage:   Supabase Storage
Charts:    Recharts
Forms:     React Hook Form + Zod
```

---

## Support & Documentation

- **Stuck?** Read **RUN_GUIDE.md**
- **Ready to deploy?** Read **DEPLOYMENT.md**
- **Platform overview?** Read **SETUP_COMPLETE.md**
- **Quick reference?** This file (START_HERE.md)

---

## You're All Set! 🎉

Your enterprise CA firm platform is ready.

**Start here:**
1. Follow the commands above
2. Open http://localhost:3000
3. Explore the platform

Questions? Check the docs or review the code comments.

**Happy coding! 🚀**

---

*Platform: TaxPro CA Firm | Status: Production Ready*
