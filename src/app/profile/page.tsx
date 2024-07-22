import Profile from "@/components/profile/Profile";
import { getUserByEmail } from "@/lib/data";
import { User } from "@/lib/User";
import { auth } from "@/middleware";

export default async function page() {
  const session = await auth();
  const currentUser = await getUserByEmail(session?.user?.email as string);
  return <Profile currentUser={currentUser as User} />;
}
