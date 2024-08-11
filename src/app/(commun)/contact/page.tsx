"use client";
import { FormEvent } from "react";

export default function Page() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error)
      }
      
    } catch (error :any
    ) {
      throw new Error(error.message)
    }
  };

  return (
    <>
      
      <div
        className="hero min-h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: "url(/images/ContactUs.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-6 py-12 text-green-950">
          <div className="max-w-lg mx-auto">
            <h1 className="mb-6 text-5xl font-extrabold leading-tight">
              Nous Contacter
            </h1>
            <p className="mb-6 text-lg font-light">
              Nous serions ravis de répondre à toutes vos questions. Utilisez le
              formulaire ci-dessous pour nous envoyer un message, et nous vous
              répondrons dans les plus brefs délais.
            </p>
          </div>
        </div>
      </div>

      
      <section className="my-16 px-4">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Formulaire de Contact
        </h2>
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                placeholder="Votre Nom"
                className="input input-bordered w-full"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Votre Email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <textarea
              name="message"
              placeholder="Votre Message"
              className="textarea textarea-bordered w-full h-40"
              required
            ></textarea>
            <button type="submit" className="btn btn-primary w-full py-3">
              Envoyer
            </button>
          </form>
        </div>
      </section>

      
      <section className="my-16 px-4 bg-gray-100 py-12">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Coordonnées
        </h2>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg mb-4">
            Vous pouvez également nous contacter par les moyens suivants :
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <svg
                className="w-6 h-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7-4 7 4v10l-7 4-7-4V8z"
                />
              </svg>
              <p className="text-lg">
                Adresse: 123 Rue des Stagiaires, Tunis, Tunisie
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <svg
                className="w-6 h-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2 8l10 6 10-6V4l-10 6-10-6v4z"
                />
              </svg>
              <p className="text-lg">Téléphone: +216 123 456 789</p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <svg
                className="w-6 h-6 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 4h-6a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2zM8 7h8M8 10h8M8 13h8M8 16h8"
                />
              </svg>
              <p className="text-lg">Email: contact@rfc.com.tn</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
