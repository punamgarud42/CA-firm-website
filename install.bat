@echo off
echo ============================================
echo  TaxPro CA Platform - Dependency Installer
echo ============================================
echo.

cd /d "%~dp0"

echo [1/4] Downgrading to Next.js 14 (Node 18 compatible)...
npm install next@14.2.20 react@18.3.1 react-dom@18.3.1 --save --legacy-peer-deps

echo.
echo [2/4] Installing core packages...
npm install @prisma/client@5.22.0 next-auth@5.0.0-beta.25 @auth/prisma-adapter@2.7.2 bcryptjs@2.4.3 zod@3.23.8 --save --legacy-peer-deps

echo.
echo [3/4] Installing UI and utility packages...
npm install @supabase/supabase-js@2.46.1 framer-motion@11.11.17 lucide-react@0.460.0 class-variance-authority@0.7.0 clsx@2.1.1 tailwind-merge@2.5.4 recharts@2.13.3 date-fns@3.6.0 react-hook-form@7.53.2 @hookform/resolvers@3.9.1 resend@4.0.1 tsx@4.19.2 --save --legacy-peer-deps

echo.
echo [4/4] Installing Radix UI components...
npm install @radix-ui/react-slot@1.1.0 @radix-ui/react-dialog@1.1.2 @radix-ui/react-dropdown-menu@2.1.2 @radix-ui/react-tabs@1.1.1 @radix-ui/react-accordion@1.2.1 @radix-ui/react-label@2.1.0 @radix-ui/react-select@2.1.2 @radix-ui/react-checkbox@1.1.2 @radix-ui/react-progress@1.1.0 @radix-ui/react-separator@1.1.0 @radix-ui/react-popover@1.1.2 @radix-ui/react-scroll-area@1.2.0 @radix-ui/react-switch@1.1.1 @radix-ui/react-toast@1.2.2 @radix-ui/react-avatar@1.1.1 --save --legacy-peer-deps

echo.
echo [5/5] Installing devDependencies...
npm install prisma@5.22.0 @types/bcryptjs@2.4.6 tailwindcss@3.4.14 autoprefixer@10.4.20 postcss@8.4.47 --save-dev --legacy-peer-deps

echo.
echo ============================================
echo  Installation complete!
echo  Next steps:
echo    1. Copy .env.example to .env.local
echo    2. Fill in your credentials
echo    3. npm run db:push
echo    4. npm run db:seed
echo    5. npm run dev
echo ============================================
pause
