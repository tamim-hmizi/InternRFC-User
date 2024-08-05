import Supervisor from "@/components/supervisor/Supervisor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encadreur/Admin",
  description: "Encadreur/Admin",
};
export default function page() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion Des Encadrants</h1>
      <Supervisor />
    </div>
  );
}
