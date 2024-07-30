import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceuil",
  description: "Acceuil",
};
export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="hero min-h-[50vh] flex items-center justify-center" // Adjust the height of the hero section and center content
        style={{
          backgroundImage: "url(/images/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-6 py-12 text-white">
          <div className="max-w-lg mx-auto">
            <h1 className="mb-6 text-5xl font-extrabold leading-tight">
              Bienvenue à la Gestion des Stagiaires RFC
            </h1>
            <p className="mb-6 text-lg font-light">
              Chez RFC, nous nous engageons à aider nos stagiaires à se
              développer et à réussir. Explorez nos ressources, gérez vos tâches
              et connectez-vous avec des mentors pour tirer le meilleur parti de
              votre expérience de stage.
            </p>
            <Link href="/login">
              <button className="btn btn-neutral text-lg  px-6">
                Commencer
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <section className="my-16 px-4">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Ce Que Nous Faisons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Gestion des Stagiaires",
              description:
                "Gérez efficacement les tâches, les horaires et la performance des stagiaires pour assurer un programme de stage fluide et productif.",
            },
            {
              title: "Programme de Mentorat",
              description:
                "Connectez-vous avec des mentors expérimentés pour vous guider tout au long de votre stage, en fournissant soutien et conseils de carrière.",
            },
            {
              title: "Ressources de Formation",
              description:
                "Accédez à une richesse de matériels et de ressources de formation conçus pour améliorer vos compétences et connaissances dans votre domaine.",
            },
          ].map(({ title, description }) => (
            <div key={title} className="card bg-white shadow-xl rounded-lg">
              <div className="card-body p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values Section */}
      <section className="my-16 px-4  py-12">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              description:
                "Nous encourageons la créativité et l'innovation pour rester à la pointe de l'industrie et offrir des solutions novatrices.",
            },
            {
              title: "Collaboration",
              description:
                "Nous croyons en l'importance de travailler ensemble pour atteindre des objectifs communs et réussir ensemble.",
            },
            {
              title: "Excellence",
              description:
                "Nous visons l'excellence dans tout ce que nous faisons pour offrir la meilleure expérience possible à nos stagiaires.",
            },
          ].map(({ title, description }) => (
            <div key={title} className="card bg-white shadow-xl rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="my-16 px-4">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Témoignages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              name: "Jean Dupont",
              testimonial:
                "L'expérience de stage chez RFC a été extrêmement enrichissante. J'ai appris énormément et j'ai eu l'opportunité de travailler sur des projets passionnants.",
            },
            {
              name: "Marie Leclerc",
              testimonial:
                "Le programme de mentorat est incroyable. Mes mentors m'ont aidé à développer mes compétences et à naviguer dans ma carrière professionnelle.",
            },
            {
              name: "Paul Martin",
              testimonial:
                "Les ressources de formation offertes sont très utiles. Elles m'ont permis d'améliorer mes compétences techniques et professionnelles.",
            },
          ].map(({ name, testimonial }) => (
            <div
              key={name}
              className="card bg-gray-50 shadow-xl rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold mb-4">{name}</h3>
              <p className="italic">&quot;{testimonial}&quot;</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
