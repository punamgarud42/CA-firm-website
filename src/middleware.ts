import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = (session?.user as any)?.role;

  // Auth required routes
  const protectedPrefixes = ["/dashboard"];
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));

  if (isProtected && !session) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users from auth pages
  if (session && (pathname === "/auth/login" || pathname === "/auth/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Role-based route protection
  if (session && pathname.startsWith("/dashboard")) {
    const adminOnlyRoutes = ["/dashboard/staff", "/dashboard/analytics"];
    const staffAdminRoutes = ["/dashboard/clients", "/dashboard/leads"];

    if (adminOnlyRoutes.some((r) => pathname.startsWith(r)) && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (staffAdminRoutes.some((r) => pathname.startsWith(r)) && !["SUPER_ADMIN", "CA_STAFF"].includes(role)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  return response;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public).*)",
  ],
};
