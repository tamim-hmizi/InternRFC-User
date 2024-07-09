"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="navbar bg-base-100 flex justify-between">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          <Image
            src="/images/logo.png"
            width={50}
            height={50}
            alt="Logo of the internrfc website."
          />
          <h1>internRFC</h1>
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
          <li>
            <Link href="/">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Inbox
            </Link>
          </li>
          <li>
            <a>
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Updates
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-1 flex justify-end gap-2">
        {loggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  alt="User Profile Photo"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li>
                <Link href="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex-1 flex justify-end gap-2">
            <Link href="/login">
              <button className="btn btn-outline btn-info">Se connecter</button>
            </Link>
            <Link href="/sign-up">
              <button className="btn btn-outline btn-success">
                S&apos;inscrire
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
