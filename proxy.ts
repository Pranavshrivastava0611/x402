import { verifyToken } from "@/lib/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * ✅ PUBLIC ROUTES
 */
const PUBLIC_PAGES = ["/", "/login", "/signup"];
const PUBLIC_APIS = ["/api/login", "/api/signup"];

/**
 * ✅ Helpers
 */
function isPublicPage(pathname: string): boolean {
  return PUBLIC_PAGES.some((p) => pathname === p || pathname.startsWith(p));
}

function isPublicApi(pathname: string): boolean {
  return PUBLIC_APIS.some((p) => pathname === p || pathname.startsWith(p));
}

function getToken(req: NextRequest): string | null {
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  const cookieToken = req.cookies.get("auth_token")?.value;
  return cookieToken || null;
}

/**
 * ✅ MAIN FUNCTION (must be named `proxy`)
 */
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Allow static & internal assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static") ||
    pathname.match(/\.(js|css|json|png|jpg|jpeg|gif|svg|ico|txt|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  // Allow public pages and public APIs
  if (isPublicPage(pathname) || isPublicApi(pathname)) {
    return NextResponse.next();
  }

  // Extract token
  const token = getToken(req);

  // Redirect if token missing
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    const redirectTarget = `${pathname}${search}`;
    loginUrl.searchParams.set("redirect", redirectTarget);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    const loginUrl = new URL("/login", req.url);
    const redirectTarget = `${pathname}${search}`;
    loginUrl.searchParams.set("redirect", redirectTarget);
    return NextResponse.redirect(loginUrl);
  }

  // Inject user headers for API routes
  if (pathname.startsWith("/api")) {
    const newHeaders = new Headers(req.headers);
    newHeaders.set("x-user-id", decoded.userId);
    newHeaders.set("x-user-email", decoded.email);
    return NextResponse.next({
      request: { headers: newHeaders },
    });
  }

  // Otherwise allow request
  return NextResponse.next();
}

/**
 * ✅ Middleware matcher (applies globally)
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|woff2?)$).*)",
  ],
};
