import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { InternshipType, ROLE, User } from "./User";
import { addUserWithoutImageFile, getUserByEmail } from "./data";
import NextAuth, { DefaultSession } from "next-auth";
import { authConfig } from "./auth.config";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | undefined | null;
      email: string | undefined | null;
      password: string | null;
      address: string | null;
      role: ROLE;
      image: string | undefined | null;
      CV: string | null;
      internshipStartDate: Date | null;
      internshipDuration: number | null;
      internshipType: InternshipType | null;
      supervisor: string | null;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
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
    async signIn({ user, account }) {
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
    async jwt({ token }) {
      const user = await getUserByEmail(token.email as string);
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
          address: user.address,
          role: user.role,
          image: user.image,
          CV: user.CV,
          internshipStartDate: user.internshipStartDate,
          internshipDuration: user.internshipDuration,
          internshipType: user.internshipType,
          supervisor: user.supervisor,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const user: User = token.user as User;
      return {
        ...session,
        user: {
          ...user,
        },
      };
    },
    ...authConfig.callbacks,
  },
});
