import { ProductType } from "@/types";

export default async function fetchAPI() {
	const token = await cookieStore.get("accessToken");

	return {
		get: async function (path: string) {
			return await fetch(path, {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token?.value}`,
				},
			});
		},
		post: async function (path: string, data?: ProductType) {
			return await fetch(path, {
				method: "POST",
				credentials: "include",
				headers: {
					"Accept": "application/json",
					"Authorization": `Bearer ${token?.value}`
				},
			})
		}
	}
}