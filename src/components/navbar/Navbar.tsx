import Links from "../Links/Links";
import Link from "next/link";
import Image from "next/image";
import LinksAdmin from "../LinksAdmin/LinksAdmin";
import { handleLogOut } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { ROLE } from "@/lib/User";
import UserLinks from "../UserLinks/UserLinks";

export default async function Navbar() {
  const session = await auth();

  const isAdmin = session?.user?.role === ROLE.ADMIN;
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <div tabIndex={0}>
            {isAdmin ? (
              <LinksAdmin changeStyles="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow" />
            ) : session?.user ? (
              <UserLinks changeStyles="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow" />
            ) : (
              <Links changeStyles="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow" />
            )}
          </div>
        </div>
        <Link href="/home" className="btn btn-ghost text-xl">
          <Image
            src="/images/logo.png"
            width={50}
            height={50}
            alt="Logo of the internrfc website."
          />
          <h1>internRFC</h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {isAdmin ? (
          <LinksAdmin changeStyles="menu menu-horizontal px-1" />
        ) : session?.user ? (
          <UserLinks changeStyles="menu menu-horizontal px-1" />
        ) : (
          <Links changeStyles="menu menu-horizontal px-1" />
        )}
      </div>
      {session?.user ? (
        <div className="navbar-end flex gap-5">
          <div tabIndex={0} className="dropdown dropdown-end">
            <div className="btn  flex justify-center items-center">
              {session?.user.name}
              {session?.user.image ? (
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <Image
                      alt="user image"
                      width={50}
                      height={50}
                      src={session?.user.image as string}
                    />
                  </div>
                </div>
              ) : (
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <Image
                      alt="user image"
                      width={50}
                      height={50}
                      src="/images/avatar.jpg"
                    />
                  </div>
                </div>
              )}
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <form className="w-full" action={handleLogOut}>
                  <button>Logout</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <Link href="/login" className="btn">
            LogIn
          </Link>
        </div>
      )}
    </div>
  );
}
