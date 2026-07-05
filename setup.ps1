# TaxPro CA Platform - Complete Setup Script
# Run this in PowerShell from the ca-firm-platform directory:
# cd "E:\website\CA firm\ca-firm-platform"
# .\setup.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " TaxPro CA Platform Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 1: Remove conflicting Next 16
Write-Host "`n[1/6] Removing Next.js 16 (incompatible with Node 18)..." -ForegroundColor Yellow
if (Test-Path "node_modules\next") {
    Remove-Item -Recurse -Force "node_modules\next"
    Write-Host "     Removed." -ForegroundColor Green
}

# Step 2: Clear lock file issues
Write-Host "`n[2/6] Cleaning package-lock.json..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
}

# Step 3: Install Next.js 14 (Node 18 compatible)
Write-Host "`n[3/6] Installing Next.js 14 (Node 18 compatible)..." -ForegroundColor Yellow
npm install next@14.2.20 react@18.3.1 react-dom@18.3.1 --legacy-peer-deps --prefer-offline

# Step 4: Install all app dependencies
Write-Host "`n[4/6] Installing app dependencies..." -ForegroundColor Yellow
npm install `
  @prisma/client@5.22.0 `
  next-auth@5.0.0-beta.25 `
  @auth/prisma-adapter@2.7.2 `
  bcryptjs@2.4.3 `
  zod@3.23.8 `
  @supabase/supabase-js@2.46.1 `
  framer-motion@11.11.17 `
  lucide-react@0.460.0 `
  class-variance-authority@0.7.0 `
  clsx@2.1.1 `
  tailwind-merge@2.5.4 `
  recharts@2.13.3 `
  date-fns@3.6.0 `
  react-hook-form@7.53.2 `
  @hookform/resolvers@3.9.1 `
  resend@4.0.1 `
  tsx@4.19.2 `
  --legacy-peer-deps

# Step 5: Install Radix UI
Write-Host "`n[5/6] Installing Radix UI components..." -ForegroundColor Yellow
npm install `
  @radix-ui/react-slot@1.1.0 `
  @radix-ui/react-dialog@1.1.2 `
  @radix-ui/react-dropdown-menu@2.1.2 `
  @radix-ui/react-tabs@1.1.1 `
  @radix-ui/react-accordion@1.2.1 `
  @radix-ui/react-label@2.1.0 `
  @radix-ui/react-select@2.1.2 `
  @radix-ui/react-checkbox@1.1.2 `
  @radix-ui/react-progress@1.1.0 `
  @radix-ui/react-separator@1.1.0 `
  @radix-ui/react-popover@1.1.2 `
  @radix-ui/react-scroll-area@1.2.0 `
  @radix-ui/react-switch@1.1.1 `
  @radix-ui/react-toast@1.2.2 `
  @radix-ui/react-avatar@1.1.1 `
  --legacy-peer-deps

# Step 6: Install dev dependencies
Write-Host "`n[6/6] Installing dev dependencies..." -ForegroundColor Yellow
npm install -D `
  prisma@5.22.0 `
  @types/bcryptjs@2.4.6 `
  @types/node@20 `
  @types/react@18 `
  @types/react-dom@18 `
  tailwindcss@3.4.14 `
  autoprefixer@10.4.20 `
  postcss@8.4.47 `
  typescript@5 `
  eslint@8 `
  eslint-config-next@14.2.20 `
  --legacy-peer-deps

Write-Host "`n========================================" -ForegroundColor Green
Write-Host " Dependencies installed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Copy .env.example to .env.local and fill credentials"
Write-Host "  2. npx prisma generate"
Write-Host "  3. npx prisma db push"
Write-Host "  4. npx tsx prisma/seed.ts"
Write-Host "  5. npm run dev"
Write-Host ""
Write-Host "Then open: http://localhost:3000" -ForegroundColor Green
