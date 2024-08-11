import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { ROLE } from "./lib/User";

export default async function middleware(req: NextRequest) {
  const session = await auth();

  const { pathname } = req.nextUrl;

  const user = session?.user;

  // Define your route access logic
  const isOnAdminRoute = pathname.startsWith("/admin");
  const isOnUserRoute = ["/profile"].some((route) =>
    pathname.startsWith(route)
  );
  const isOnUnAuthenticatedRoute = ["/login", "/register"].some((route) =>
    pathname.startsWith(route)
  );
  const isOnCommunRoute = ["/home", "/about", "/contact"].some((route) =>
    pathname.startsWith(route)
  );

  // Authorization checks
  if (isOnUserRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isOnUnAuthenticatedRoute && user) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (isOnAdminRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isOnAdminRoute && user?.role !== ROLE.ADMIN) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (isOnCommunRoute && user?.role === ROLE.ADMIN) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (isOnUserRoute && user?.role === ROLE.ADMIN) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
