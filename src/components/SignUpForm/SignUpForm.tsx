"use client";

import { handleSignUp } from "@/lib/actions";
import { InternshipType } from "@/lib/User";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function SignUpForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(handleSignUp, undefined);
  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);
  return (
    <form
      action={formAction}
      className="card bg-neutral text-neutral-content w-96"
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title">S&apos;inscrire</h2>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Nom"
            name="name"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Adresse email"
            name="email"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Mot de passe"
            name="password"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 0a5.53 5.53 0 0 0-5.53 5.53c0 4.67 5.53 10.47 5.53 10.47s5.53-5.8 5.53-10.47A5.53 5.53 0 0 0 8 0zm0 8a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Adresse"
            name="address"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          Image
          <input
            type="file"
            className="file-input file-input-ghost w-full max-w-xs"
            name="image"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          CV
          <input
            type="file"
            className="file-input file-input-ghost w-full max-w-xs"
            name="CV"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          Date début stage
          <input
            type="date"
            className="grow"
            placeholder="Date de début de stage"
            name="internshipStartDate"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <span className="whitespace-nowrap">Durée stage</span>
          <input
            type="number"
            className="grow"
            placeholder="(en jours)"
            name="internshipDuration"
            required
          />
        </label>
        <label className="flex items-center gap-2 w-full">
          <select
            className="select w-full max-w-xs"
            name="internshipType"
            required
            defaultValue=""
          >
            <option value="" disabled hidden>
              Type de Stage
            </option>
            <option value={InternshipType.OUVRIER}>OUVRIER</option>
            <option value={InternshipType.PROJET}>PROJET</option>
            <option value={InternshipType.PFE}>PFE</option>
          </select>
        </label>
        {state?.error && <p className="text-error text-sm">{state.error}</p>}
        <div className="card-actions justify-end">
          <button type="submit" className="btn btn-primary">
            S&apos;inscrire
          </button>
          <Link href="/login">
            <button className="btn btn-ghost">Connexion</button>
          </Link>
        </div>
      </div>
    </form>
  );
}
