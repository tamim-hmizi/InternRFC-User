import bcrypt from "bcryptjs";
import { InternshipType, ROLE, User } from "./lib/User";
import { addUserWithoutImageFile, getUserByEmail } from "./lib/data";
import NextAuth, { DefaultSession } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | undefined | null;
      email: string | undefined | null;
      role: ROLE;
      image: string | undefined | null;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  trustHost: true,
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const existingUser = await getUserByEmail(
            credentials.email as string
          );

          if (!existingUser) {
            throw new Error("Utilisateur n'existe plus!");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            existingUser.password as string
          );

          if (!isPasswordCorrect) {
            throw new Error("Mot de passe incorrect!");
          }

          return existingUser;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "github") {
        try {
          const existingUser = await getUserByEmail(user.email as string);
          if (existingUser) return true;

          const newUser: User = {
            email: user.email,
            name: user.name,
            image: user.image,
            password: null,
            address: null,
            role: ROLE.INTERN,
            CV: null,
            internshipDuration: null,
            internshipStartDate: null,
            internshipType: null,
            supervisor: null,
          };
          await addUserWithoutImageFile(newUser);
        } catch (error) {
          console.error("SignIn error:", error);
          return false;
        }
      }
      return true;
    },
    jwt: async ({ token }) => {
      const user = await getUserByEmail(token.email as string);
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      const user: User = token.user as User;

      return {
        ...session,
        user: {
          ...session.user,
          ...user,
        },
      };
    },
  },
});
