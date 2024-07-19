import Link from "next/link";

export default function LinksAdmin({ changeStyles }: { changeStyles: string }) {
  const linksAdmin = [
    {
      title: "Dashboard",
      path: "/dashboard",
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
