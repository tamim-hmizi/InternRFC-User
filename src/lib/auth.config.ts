import { NextRequest } from "next/server";
import { Session } from "next-auth";
import { ROLE, User } from "./User";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      const user: User | undefined = auth?.user;

      if (user?.email === "hmizitamim@hotmail.com") {
        user.role = ROLE.ADMIN;
      }

      const isOnAdminRoute = request.nextUrl.pathname.startsWith("/admin");

      const userRoutes = ["/profile"];
      const isOnUserRoute = userRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      const authRoutes = ["/login", "/register"];
      const isOnUnAuthenticatedRoute = authRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      const communRoutes = ["/home", "/about", "contact"];
      const isOnCommunRoute = communRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      if (isOnUserRoute && !user) {
        return false;
      }

      if (isOnUnAuthenticatedRoute && user) {
        return Response.redirect(new URL("/home", request.nextUrl));
      }
      if (isOnAdminRoute && user?.role !== ROLE.ADMIN) {
        return false;
      }

      if (isOnCommunRoute && user?.role === ROLE.ADMIN) {
        return Response.redirect(new URL("/admin", request.nextUrl));
      }
      if (isOnUserRoute && user?.role === ROLE.ADMIN) {
        return Response.redirect(new URL("/admin", request.nextUrl));
      }

      return true;
    },
  },
};
