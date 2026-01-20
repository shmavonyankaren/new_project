"use client"

import { LuLogOut } from "react-icons/lu";

import logoutUser from "@/utils/logoutUser";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Link from "next/link";

export default function Header() {
	const router = useRouter();

	const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		const res = await logoutUser()

		if (res?.success) {
			router.replace("/sign-in");
		}
	}
	return (
		<div className="w-full flex pt-3 px-2 justify-between items-center">
			<div className="">
				<h3 className="text-white text-3xl">ShopSpace </h3>
			</div>
			<div>
				<Link href={'/products'} className="text-white">Products</Link>
			</div>
			<button onClick={handleLogout} className="cursor-pointer">
				<LuLogOut color="white" size={30} />
			</button>
		</div >
	)
}