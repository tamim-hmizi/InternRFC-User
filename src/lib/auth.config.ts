import { NextRequest } from "next/server";
import { DefaultSession, Session } from "next-auth";
import { ROLE } from "./User";

declare module "next-auth" {
  interface Session {
    user: {
      role: ROLE;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    authorized({
      request,
      auth,
    }: {
      request: NextRequest;
      auth: Session | null;
    }) {
      const user = auth?.user;

      const communRoutes = ["/home", "/contact", "/about"];
      const isOnCommunRoutes = communRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      const isOnAdminRoute = request.nextUrl.pathname.startsWith("/admin");

      const userRoutes = ["/user"];
      const isOnUserRoute = userRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      const authRoutes = ["/login", "/register"];
      const isOnUnAuthenticatedRoute = authRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      if (isOnCommunRoutes && user?.role == ROLE.ADMIN)
        return Response.redirect(new URL("/admin", request.nextUrl));

      if (isOnAdminRoute && user?.role !== ROLE.ADMIN) return false;

      if (isOnUserRoute && !user) return false;

      if (isOnUnAuthenticatedRoute && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
