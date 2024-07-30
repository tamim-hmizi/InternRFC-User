import Admin from "@/components/admin/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
};
export default function page() {
  return <Admin />;
}
