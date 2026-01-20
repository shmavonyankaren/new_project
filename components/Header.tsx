"use client";

import { LuLogOut } from "react-icons/lu";

import logoutUser from "@/utils/logoutUser";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Link from "next/link";

export default function Header() {
  const router = useRouter();

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await logoutUser();

    if (res?.success) {
      router.replace("/sign-in");
    }
  };
  return (
    <header className="header-container">
      <div className="header-logo">
        <h3 className="header-title">ShopSpace</h3>
      </div>
      <nav className="header-nav">
        <Link href={"/products"} className="header-link">
          Products
        </Link>
      </nav>
      <button onClick={handleLogout} className="header-logout">
        <LuLogOut size={24} />
      </button>
    </header>
  );
}
