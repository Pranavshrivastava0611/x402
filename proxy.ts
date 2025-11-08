import { verifyToken } from "@/lib/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";



const PUBLIC_PAGES = new Set(["/", "/login"]);
const PUBLIC_API_PREFIXES = ["/api/login", "/api/signup"];

function isPublicPage(pathname: string) {
  return PUBLIC_PAGES.has(pathname);
}

function isPublicApi(pathname: string) {
  return PUBLIC_API_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function getToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.replace("Bearer ", "");
  }

  const cookieToken = request.cookies.get("auth_token")?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}
console.log('proxxy working')
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api");

  // Allow Next.js internals and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/static") ||
    pathname.match(/\.(js|css|json|png|jpg|jpeg|gif|svg|ico|txt|woff2?)$/)
  ) {
    return NextResponse.next();
  }

  if (!isApiRoute && isPublicPage(pathname)) {
    return NextResponse.next();
  }

  if (isApiRoute && isPublicApi(pathname)) {
    return NextResponse.next();
  }

  const token = getToken(request);

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loginUrl = new URL("/login", request.url);
    const redirectTarget = `${pathname}${request.nextUrl.search}`;
    loginUrl.searchParams.set("redirect", redirectTarget);
    return NextResponse.redirect(loginUrl);
  }

  const payload = verifyToken(token);

  if (!payload) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const loginUrl = new URL("/login", request.url);
    const redirectTarget = `${pathname}${request.nextUrl.search}`;
    loginUrl.searchParams.set("redirect", redirectTarget);
    return NextResponse.redirect(loginUrl);
  }

  if (isApiRoute) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-email", payload.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|woff2?)$).*)",
  ],
};

