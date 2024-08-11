import Admin from "@/components/admin/Admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centre Admin",
  description: "Centre Admin",
};
export default function page() {
  return <Admin />;
}
