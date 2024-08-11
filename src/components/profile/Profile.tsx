"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { handleDeleteAccount, handleProfileUpdate } from "@/lib/actions";
import { User, InternshipType } from "@/lib/User";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

export default function Profile({ currentUser }: { currentUser: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleToggleEdit = () => setIsEditing(!isEditing);

  const router = useRouter();

  const [state, formAction] = useFormState(handleProfileUpdate, undefined);

  useEffect(() => {
    state?.success && router.refresh();
  }, [state?.success, router]);

  return (
    <div className="form-control justify-center items-center">
      <form action={formAction} className="space-y-4">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
            <div className="flex flex-col justify-center items-center ">
              <label className="avatar cursor-pointer">
                {!isEditing && (
                  <div className="w-24 md:w-64 h-24 md:h-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
                    <Image
                      src={
                        currentUser
                          ? (currentUser.image as string)
                          : "/images/avatar.jpg"
                      }
                      alt="user image"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
                {isEditing && (
                  <div className="w-24 md:w-64 h-24 md:h-64 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:brightness-50 transition-full overflow-hidden">
                    <Image
                      src={
                        currentUser
                          ? (currentUser.image as string)
                          : "/images/avatar.jpg"
                      }
                      alt="user image"
                      width={128}
                      height={128}
                      className="rounded-full "
                    />
                    <input
                      type="file"
                      className="file-input file-input-bordered mt-2"
                      name="image"
                      hidden
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-50 transition-opacity">
                      <Image
                        src="/images/pencil.png"
                        alt="edit icon"
                        width={70}
                        height={70}
                        className="opacity-70 rounded-full "
                      />
                    </div>
                  </div>
                )}
              </label>
              <h1 className="text-xl md:text-2xl font-bold mt-4">
                {currentUser?.name}
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                {currentUser?.email}
              </p>
            </div>

            {isEditing ? (
              <div className="bg-gray-700 rounded-lg	p-10">
                <label className="label">
                  <span className="label-text w-20">Nom</span>
                  <input
                    type="text"
                    className="input input-bordered w-80"
                    name="name"
                    defaultValue={currentUser?.name || ""}
                  />
                </label>

                <label className="label">
                  <span className="label-text w-20">Mot de passe</span>
                  <input
                    type="password"
                    className="input input-bordered w-80"
                    name="password"
                  />
                </label>
                <label className="label">
                  <span className="label-text w-20">Adresse</span>
                  <input
                    type="text"
                    className="input input-bordered w-80"
                    name="address"
                    defaultValue={currentUser?.address || ""}
                  />
                </label>
                <label className="label">
                  <span className="label-text w-20">CV</span>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-80"
                    name="CV"
                  />
                </label>
                <label className="label">
                  <span className="label-text w-20">Date début stage</span>
                  <input
                    type="date"
                    className="input input-bordered w-80"
                    name="internshipStartDate"
                    defaultValue={
                      currentUser?.internshipStartDate
                        ? new Date(currentUser.internshipStartDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                  />
                </label>
                <label className="label">
                  <span className="label-text w-20">
                    Durée stage (en jours)
                  </span>
                  <input
                    type="number"
                    className="input input-bordered w-80"
                    name="internshipDuration"
                    defaultValue={currentUser?.internshipDuration || ""}
                  />
                </label>
                <label className="label">
                  <span className="label-text w-20">Type de Stage</span>
                  <select
                    className="select select-bordered w-80"
                    name="internshipType"
                    defaultValue={currentUser?.internshipType || ""}
                  >
                    <option value="" disabled hidden>
                      Type de Stage
                    </option>
                    <option value={InternshipType.OUVRIER}>OUVRIER</option>
                    <option value={InternshipType.PROJET}>PROJET</option>
                    <option value={InternshipType.PFE}>PFE</option>
                  </select>
                </label>
                {state?.error && (
                  <p className="text-error text-sm">{state.error}</p>
                )}
                <button type="submit" className="btn btn-primary mr-5">
                  Changer
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={handleToggleEdit}
                >
                  Annuler
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-10 bg-gray-700 rounded-lg	p-10">
                <p className="text-base md:text-lg">
                  <strong>Adresse :</strong>{" "}
                  {currentUser?.address || "Pas d'adresse"}
                </p>
                <p className="text-base md:text-lg">
                  <strong>Durée du stage :</strong>{" "}
                  {currentUser?.internshipDuration || "Durée non spécifiée"}
                </p>
                <p className="text-base md:text-lg">
                  <strong>Date début de stage :</strong>{" "}
                  {currentUser?.internshipStartDate
                    ? new Date(currentUser.internshipStartDate).toDateString()
                    : "Date non spécifiée"}
                </p>
                <p className="text-base md:text-lg">
                  <strong>Type de Stage :</strong>{" "}
                  {currentUser?.internshipType || "Type de stage non spécifié"}
                </p>
                <p className="text-base md:text-lg">
                  <strong>CV :</strong>{" "}
                  {currentUser?.CV ? (
                    <Link target="_blank" href={currentUser?.CV}>Voir CV</Link>
                  ) : (
                    "CV non partagée"
                  )}
                </p>
                <p className="text-base md:text-lg">
                  <strong>Encadrant :</strong>{" "}
                  {currentUser?.supervisor || "Encadrant non affecté"}
                </p>
                <button className="btn btn-primary" onClick={handleToggleEdit}>
                  Modifier
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
      <form className="space-y-5" action={handleDeleteAccount}>
        <input
          type="hidden"
          name="email"
          value={currentUser?.email as string}
        />
        <button type="submit" className="btn btn-secondary w-max">
          Supprimer compte
        </button>
      </form>
    </div>
  );
}
