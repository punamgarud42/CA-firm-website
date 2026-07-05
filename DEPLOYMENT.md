# TaxPro CA Firm Platform — Deployment Guide

## Prerequisites
- Node.js 18+ (20+ recommended)
- PostgreSQL database (Supabase recommended)
- Vercel account
- Supabase account

---

## 1. Local Development Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in all values in .env.local (see section below)

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with demo data
npm run db:seed

# Start development server
npm run dev
```

---

## 2. Environment Variables

### Required
```
DATABASE_URL            PostgreSQL connection string
AUTH_SECRET             Random 32+ char string (generate: openssl rand -base64 32)
AUTH_URL                Your app URL (http://localhost:3000 for dev)
AUTH_GOOGLE_ID          Google OAuth Client ID
AUTH_GOOGLE_SECRET      Google OAuth Client Secret
NEXT_PUBLIC_SUPABASE_URL        Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY   Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY       Supabase service role key
NEXT_PUBLIC_APP_URL     Your production URL
```

### Optional (enhances features)
```
RESEND_API_KEY          For email notifications
EMAIL_FROM              From email address
OPENAI_API_KEY          For AI Assistant (GPT-4o-mini)
NEXT_PUBLIC_SENTRY_DSN  For error monitoring
NEXT_PUBLIC_POSTHOG_KEY For analytics
```

---

## 3. Supabase Setup

### Database
1. Create a new Supabase project at https://supabase.com
2. Go to Project Settings → Database → Connection string
3. Copy the connection string (use "Transaction" mode for Vercel)
4. Add `?pgbouncer=true&connection_limit=1` to connection string for serverless

### Storage Buckets
Create these buckets in Supabase Storage:
- `documents` (for client documents)
- `avatars` (for profile pictures)

Set bucket policies:
```sql
-- documents bucket: authenticated users only
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Users can view own documents" ON storage.objects  
FOR SELECT TO authenticated USING (bucket_id = 'documents');
```

---

## 4. Google OAuth Setup

1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. APIs & Services → OAuth consent screen
   - User Type: External
   - Fill in app name, support email
4. APIs & Services → Credentials → Create OAuth client ID
   - Application type: Web application
   - Authorized origins: `http://localhost:3000`, `https://yourdomain.com`
   - Authorized redirect URIs: 
     - `http://localhost:3000/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google`
5. Copy Client ID and Secret to env vars

---

## 5. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard or:
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
# ... (add all from .env.example)

# Deploy to production
vercel --prod
```

### Vercel Settings
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Post-deployment
```bash
# Run migrations on production DB
npx prisma migrate deploy

# Or push schema directly
npx prisma db push
```

---

## 6. Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Database connection working
- [ ] Supabase storage buckets created with correct policies
- [ ] Google OAuth redirect URIs updated to production domain
- [ ] Auth secret is a strong random string (32+ chars)
- [ ] Custom domain configured in Vercel
- [ ] SSL certificate active
- [ ] Seed database with initial admin user
- [ ] Test login flow (email + Google)
- [ ] Test file upload
- [ ] Test contact form submission
- [ ] Verify email notifications working

---

## 7. Post-Launch Admin Tasks

1. **Create Admin Account**: Use seed script or create manually
2. **Add Staff Members**: Go to Admin Dashboard → Staff → Add New
3. **Onboard First Client**: Admin Dashboard → Clients → Add Client
4. **Configure Compliance Templates**: Set up recurring compliance items
5. **Customize Branding**: Update firm name, logo, colors in config

---

## 8. Updating the Database Schema

```bash
# Modify prisma/schema.prisma
# Then run:
npm run db:migrate -- --name your_migration_name
npm run db:generate
```

---

## Tech Stack Summary
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions, API Routes
- **Database**: PostgreSQL via Supabase + Prisma ORM
- **Auth**: NextAuth v5 (credentials + Google OAuth)
- **Storage**: Supabase Storage
- **Email**: Resend
- **AI**: OpenAI GPT-4o-mini (with fallback knowledge base)
- **Deployment**: Vercel
- **Monitoring**: Sentry + PostHog (optional)
