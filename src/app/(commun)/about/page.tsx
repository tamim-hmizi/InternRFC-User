import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About",
};
export default function Page() {
  return (
    <>
      
      <div
        className="hero min-h-[50vh] flex items-center justify-center" // Adjust the height of the hero section and center content
        style={{
          backgroundImage: "url(/images/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" text-center px-6 py-12 text-green-950">
          <div className="max-w-lg mx-auto">
            <h1 className="mb-6 text-5xl font-extrabold leading-tight">
              À Propos de Nous
            </h1>
            <p className="mb-6 text-lg font-light">
              Découvrez l&apos;histoire, la mission, et les valeurs qui nous
              guident chez RFC. Nous sommes passionnés par le développement des
              talents et la réussite de nos stagiaires.
            </p>
          </div>
        </div>
      </div>

      
      <section className="my-16 px-4">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Notre Histoire
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg leading-relaxed">
            Fondée en [année], RFC a été créée avec l&apos;objectif de fournir
            des opportunités de stage de haute qualité aux jeunes talents. Nous
            avons commencé avec une petite équipe passionnée et avons évolué
            pour devenir un leader dans la gestion des stagiaires.
            Aujourd&apos;hui, nous offrons une gamme complète de services pour
            aider nos stagiaires à réussir et à exceller dans leur carrière
            professionnelle.
          </p>
        </div>
      </section>

     
      <section className="my-16 px-4 bg-gray-100 py-12">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Notre Mission
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg leading-relaxed">
            Chez RFC, notre mission est de créer un environnement stimulant et
            soutenant pour les stagiaires. Nous visons à fournir des ressources,
            des mentors et des opportunités qui permettent à chaque stagiaire de
            développer ses compétences, de relever des défis et de réaliser ses
            objectifs professionnels. Nous croyons fermement que chaque stage
            est une opportunité de croissance et de succès.
          </p>
        </div>
      </section>

      
      <section className="my-16 px-4">
        <h2 className="text-4xl font-semibold text-center mb-12">
          Rencontrez Notre Équipe
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              name: "Jean Dupont",
              role: "Directeur Général",
              bio: "Jean est le fondateur de RFC avec plus de 20 ans d'expérience dans le développement des talents et la gestion des ressources humaines.",
              image: "/images/jean.jpg",
            },
            {
              name: "Marie Leclerc",
              role: "Responsable du Programme de Mentorat",
              bio: "Marie dirige notre programme de mentorat avec une passion pour le développement professionnel et le soutien des jeunes talents.",
              image: "/images/marie.jpeg",
            },
            {
              name: "Paul Martin",
              role: "Responsable des Ressources de Formation",
              bio: "Paul est responsable de la création et de la gestion de nos ressources de formation pour garantir qu'elles répondent aux besoins des stagiaires.",
              image: "/images/paul.jpeg",
            },
          ].map(({ name, role, bio, image }) => (
            <div
              key={name}
              className="card bg-white shadow-xl rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={name}
                className="w-full h-48 object-cover"
                height={1080}
                width={1920}
              />
              <div className="card-body p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{name}</h3>
                <h4 className="text-md font-medium mb-4 text-gray-600">
                  {role}
                </h4>
                <p className="text-sm">{bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
