import Profile from "@/components/profile/Profile";
import { User } from "@/lib/User";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
};

export default async function page() {
  const session = await auth();
  const currentUser = session?.user;
  return <Profile currentUser={currentUser as User} />;
}
