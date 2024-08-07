import Image from "next/image";

export default function Admin() {
  return (
    <>
      <Image
        src="/images/admin.png"
        width={500}
        height={500}
        alt="admin welcome picture"
      />
    </>
  );
}