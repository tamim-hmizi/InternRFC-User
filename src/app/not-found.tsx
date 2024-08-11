import { ROLE } from "@/lib/User";
import { auth } from "@/auth";
import Link from "next/link";

export const metadata = {
  title: "Page non trouvée",
  description: "Page non trouvée",
};

export default async function NotFound() {
  const session = await auth();
  const role = session?.user.role;
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Page non trouvée !</h2>
        <p>Désolé, la page que vous recherchez n&apos;existe pas.</p>
        <div className="card-actions justify-end">
          <Link href={role === ROLE.ADMIN ? "/admin" : "/home"}>
            <button className="btn btn-primary">
              Retour à la page d&apos;accueil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
