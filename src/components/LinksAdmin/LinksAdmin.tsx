import Link from "next/link";

export default function LinksAdmin({ changeStyles }: { changeStyles: string }) {
  const linksAdmin = [
    {
      title: "Stagiéres",
      path: "/admin/intern",
    },
    {
      title: "Encadrant",
      path: "/admin/supervisor",
    },
    {
      title: "Projet",
      path: "/admin/projet",
    },
    {
      title: "Calendrier",
      path: "/admin/calendrier",
    },
    {
      title: "Travail",
      path: "/admin/travail",
    },
  ];

  return (
    <ul className={changeStyles}>
      {linksAdmin.map((link) => (
        <li key={link.title}>
          <Link href={link.path}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
}
