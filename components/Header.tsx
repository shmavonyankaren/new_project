"use client";

import { LuLogOut } from "react-icons/lu";

import logoutUser from "@/utils/logoutUser";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

export default function Header() {
  const router = useRouter();
  const bucketItems = useAppSelector(state => state.bucketProducts.products);

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
        <Link href={"/products?page=1"} className="header-link">
          Products
        </Link>
        <div className="flex relative">
          <Link href={"/cart"} className="header-link">
            Cart
          </Link>
          <p className="text-red-600 absolute  top-0 right-1">{bucketItems.length}</p>
        </div>
      </nav>
      <button onClick={handleLogout} className="header-logout">
        <LuLogOut size={24} />
      </button>
    </header>
  );
}
