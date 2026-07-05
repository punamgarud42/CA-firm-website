# TaxPro CA Platform - Complete Run Guide

## 🚀 Quick Start (5 Minutes)

This is a production-ready enterprise CA firm platform with a public website, secure client portal, admin dashboard, and AI-powered compliance management.

### Prerequisites
- **Node.js 18+** (check: `node --version`)
- **npm 9+** (check: `npm --version`)
- **PostgreSQL 14+** OR a **Supabase account** (free tier works)
- **Git** (optional, for version control)

### 1. Install Dependencies

```bash
cd "E:\website\CA firm\ca-firm-platform"

# Option A: Quick install (from setup.ps1)
..\setup.ps1

# Option B: Manual install (if Option A fails)
npm install --legacy-peer-deps
```

### 2. Set Up Database

**Choose one:**

#### Option A: Supabase (Easiest)
1. Create free account at https://supabase.com
2. Create new project
3. Go to **Settings → Database** → copy connection string
4. Paste into `.env.local` as `DATABASE_URL`

#### Option B: Local PostgreSQL
```bash
# macOS
brew install postgresql
psql -U postgres
CREATE DATABASE ca_firm_db;

# Windows
# Download from https://www.postgresql.org/download/windows/
```

### 3. Configure Environment Variables

Copy `.env.local` and fill in your actual values:

```bash
cp .env.example .env.local
```

Minimum required:
```env
# Database connection (from Supabase or local PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/ca_firm_db"

# Generate random 32-char string:
# Windows PowerShell: [System.Convert]::ToBase64String((1..32 | ForEach {Get-Random -Minimum 0 -Maximum 256}) -as [byte[]])
# macOS/Linux: openssl rand -base64 32
AUTH_SECRET="your-32-char-random-string"
AUTH_URL="http://localhost:3000"

NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### 4. Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Create tables
npm run db:push

# Seed with demo data (admin user, sample clients, compliance items)
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open **http://localhost:3000**

---

## 📋 Demo Accounts (After Seeding)

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@taxpro.in | Admin@123456 |
| **CA Staff** | ca.rajesh@taxpro.in | Staff@123456 |
| **Client** | client@techventures.in | Client@123456 |

---

## 🗂️ Platform Structure

### Public Website
- **Homepage** - Hero, services, testimonials, stats
- **Services** - 9 CA service pages with detailed info
- **About** - Firm history, team, values, certifications
- **Industries** - Vertical-specific insights
- **Blog** - SEO-optimized articles
- **FAQs** - Compliance questions
- **Contact** - Lead capture form

### Client Portal (`/dashboard`)
- **Dashboard** - Compliance overview, quick stats
- **Compliance Tracker** - GST, ITR, ROC, TDS status
- **Documents** - Upload, organize, download files
- **Tasks** - Assigned work items with deadlines
- **Appointments** - Book CA meetings
- **Messages** - Real-time chat with assigned CA
- **Invoices** - Payment history and tracking
- **AI Assistant** - Tax and compliance chatbot
- **Settings** - Profile, company details

### Admin Dashboard (`/dashboard`)
- **Overview** - KPIs, revenue, client growth charts
- **Clients** - Full client management
- **Leads** - Web form leads + conversion funnel
- **Staff** - CA team management
- **Compliance** - System-wide compliance view
- **Analytics** - In-depth performance reports
- **CMS** - Blog, testimonials, FAQs editor
- **Notifications** - System alerts and urgent items

---

## 🔐 Key Features

### Authentication
- Email/password signup and login
- Google OAuth (configure in console.cloud.google.com)
- Role-based access control (Super Admin, CA Staff, Client)
- Secure JWT sessions
- Password hashing with bcrypt

### Compliance Management
- GST return tracking
- Income tax filing deadlines
- ROC annual return management
- TDS and advance tax tracking
- Automated due-date reminders
- Status pipeline (Pending → In Progress → Completed)

### Document Management
- Secure file upload (via Supabase)
- PDF preview
- File organization by category (GST, ITR, Audit, ROC)
- Soft delete (never actually removes data)
- Access control per client

### Real-Time Features
- Live messaging between CA and clients
- Notification system
- Compliance status updates
- Task assignments

### AI Assistant
- Answers GST, ITR, TDS questions
- Explains compliance terms
- Provides filing deadlines
- Uses OpenAI (or built-in knowledge base fallback)

---

## 📁 Project Structure

```
ca-firm-platform/
├── src/
│   ├── app/
│   │   ├── (public)/              # Public website pages
│   │   ├── auth/                  # Login, signup, auth callbacks
│   │   ├── api/                   # Route handlers
│   │   ├── dashboard/             # Client & admin portal
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Tailwind CSS
│   │   ├── error.tsx              # Error boundary
│   │   └── not-found.tsx          # 404 page
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── website/               # Public site sections
│   │   ├── dashboard/             # Dashboard components
│   │   └── providers.tsx          # App providers (auth, toast)
│   ├── actions/                   # Server actions
│   ├── lib/                       # Utilities
│   │   ├── auth.ts                # NextAuth config
│   │   ├── prisma.ts              # Prisma client
│   │   ├── supabase.ts            # Supabase client
│   │   └── utils.ts               # Helper functions
│   ├── hooks/                     # React hooks
│   ├── middleware.ts              # Route protection
│   └── types/                     # TypeScript types
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Demo data
├── public/                        # Static assets
├── .env.local                     # Environment variables (create this)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repo at vercel.com
3. Add environment variables in Vercel dashboard
4. Deploy
5. Run database migrations: `npm run db:push`

See DEPLOYMENT.md for full guide.

---

## 🐛 Troubleshooting

### "Cannot find module 'next'"
Run `npm install --legacy-peer-deps` again, or try the setup.ps1 script.

### Database connection failed
Check DATABASE_URL in .env.local. For Supabase, use the PostgreSQL connection string from Settings → Database.

### Port 3000 already in use
Run on different port: `npm run dev -- -p 3001`

### Prisma type errors
Run `npm run db:generate` to regenerate the Prisma client.

### OAuth not working
Set up Google OAuth at console.cloud.google.com. Add credentials to .env.local and make sure callback URL is set to `http://localhost:3000/api/auth/callback/google`.

---

## 📚 Next Steps

1. **Test the full flow**: Create account, login, explore dashboard
2. **Update content**: Edit about page, services, testimonials in CMS
3. **Configure email**: Set up Resend API key for contact form notifications
4. **Set up real database**: Move from demo to production database
5. **Deploy**: Follow DEPLOYMENT.md for Vercel + Supabase setup

---

## 📞 Support

The codebase includes:
- Comprehensive inline comments
- TypeScript types for all models
- Error boundaries and error pages
- Audit logging for compliance
- Middleware for route protection
- Server-side validation with Zod

For questions, check DEPLOYMENT.md or review the code comments in the relevant modules.
