import Intern from "@/components/intern/Intern";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stagiere/Admin",
  description: "Stagiere/Admin",
};
export default function page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Supervisor Management</h1>
      <Intern />
    </div>
  );
}
