# TaxPro — Premium Enterprise CA Firm Platform

A world-class, enterprise-grade Chartered Accountant (CA) firm platform built with Next.js 14, TypeScript, Prisma, and Supabase.

## Features

### Public Website
- Premium hero section with animated counters
- Services showcase (9 services with detailed cards)
- About page with team, mission, values
- Industries served section
- Client testimonials carousel
- Blog with SEO optimization
- FAQ accordion with search
- Contact page with lead capture form
- WhatsApp & call CTAs

### Client Portal
- Secure login (Email + Google OAuth)
- Compliance tracker with status dashboard
- Document manager (upload, download, organize by category)
- Task management (Kanban + list view)
- Appointment booking system
- Real-time messaging with assigned CA
- Invoice & payment history
- AI Tax Assistant (GST, ITR, TDS queries)
- Profile & company settings

### Admin Dashboard
- KPI metrics (clients, revenue, leads, compliance)
- Revenue & client growth charts
- Complete client management
- Lead tracking with status pipeline
- Staff management
- Compliance administration
- Invoice management

### Security
- Role-based access control (Super Admin, CA Staff, Client)
- JWT sessions with server-side validation
- CSRF protection via NextAuth
- Secure file upload validation
- SQL injection prevention (Prisma)
- Security headers (CSP, HSTS, etc.)
- Middleware route protection

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in environment variables
npm run db:push
npm run db:seed
npm run dev
```

## Demo Accounts (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@taxpro.in | Admin@123456 |
| CA Staff | ca.rajesh@taxpro.in | Staff@123456 |
| Client | client@techventures.in | Client@123456 |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS 3, custom components |
| Animations | Framer Motion, CSS animations |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth v5 (Credentials + Google) |
| Storage | Supabase Storage |
| Email | Resend |
| AI | OpenAI GPT-4o-mini |
| Charts | Recharts |
| Deployment | Vercel + Supabase |

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.
