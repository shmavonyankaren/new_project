import fetchAPI from "./fetchAPI";

export default async function logoutUser() {
	try {
		// const token = await cookieStore.get("accessToken");
		// const res = await fetch("/api/logout", {
		// 	method: "POST",
		// 	credentials: "include",
		// 	headers: {
		// 		"Accept": "application/json",
		// 		"Authorization": `Bearer ${token?.value}`
		// 	},
		// })
		const res = await ((await fetchAPI()).post("/api/logout"))

		if (!res.ok) throw new Error("Logout error");

		cookieStore.delete("accessToken");
		return {
			success: true
		}
	} catch (err) {
		console.log(err)
	}
}