import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { ROLE, User } from "./User";
import { addUserWithoutImageFile, getUserByEmail } from "./data";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

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
    ...authConfig.callbacks,
  },
});
