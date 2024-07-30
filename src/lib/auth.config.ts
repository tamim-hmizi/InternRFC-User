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

      const communRoutes = ["/home", "/contact", "/about"];
      const isOnCommunRoutes = communRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      const isOnAdminRoute = request.nextUrl.pathname.startsWith("/admin");

      const userRoutes = ["/profile"];
      const isOnUserRoute = userRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      const authRoutes = ["/login", "/register"];
      const isOnUnAuthenticatedRoute = authRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      // if (isOnCommunRoutes && user?.role === ROLE.ADMIN) {
      //   return Response.redirect(new URL("/admin", request.nextUrl));
      // }

      // if (isOnAdminRoute && user?.role !== ROLE.ADMIN) {
      //   return Response.redirect(new URL("/home", request.nextUrl));
      // }

      // if (isOnUserRoute && user?.role === ROLE.ADMIN) {
      //   return Response.redirect(new URL("/admin", request.nextUrl));
      // }

      if (isOnUserRoute && !user) {
        return false;
      }

      if (isOnUnAuthenticatedRoute && user) {
        return Response.redirect(new URL("/home", request.nextUrl));
      }
      return true;
    },
  },
};
