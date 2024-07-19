import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { ROLE, User } from "./User";
import { addUserWithoutImageFile, getUserByEmail } from "./data";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
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
          };
          await addUserWithoutImageFile(newUser);
        } catch (error) {
          return false;
        }
      }
      return true;
    },
  },
});
