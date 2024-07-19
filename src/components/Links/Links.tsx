import Link from "next/link";

export default function Links({ changeStyles }: { changeStyles: string }) {
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Projet",
      path: "/projet",
    },
  ];

  return (
    <ul className={changeStyles}>
      {links.map((link) => (
        <li key={link.title}>
          <Link href={link.path}>{link.title}</Link>
        </li>
      ))}
    </ul>
  );
}
