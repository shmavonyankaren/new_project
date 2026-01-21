import { SignInInputs } from "@/types";
import authFetchAPI from "./authFetchAPI";
// import { cookies } from "next/headers";


export default async function loginUser(data: SignInInputs) {
	const { email, password } = data;

	const sendingData = {
		email,
		password,
	};

	try {
		const res = await (await authFetchAPI()).post("/api/login", sendingData)
		// const res = await fetch("/api/login", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(sendingData),
		// });

		if (res.ok) {
			// throw new Error(`HTTP error! status: ${res.status}`);

			const token = await res.json();
			// const cookieStore = await cookies()

			await cookieStore.set("accessToken", token.accessToken);

			return { success: true };
		}

		return {
			success: false
		}
	} catch (err) {
		console.error(err);
		return { success: false };
	}
}
