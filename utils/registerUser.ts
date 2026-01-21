import { SignUpInputs } from "@/types";
import authFetchAPI from "./authFetchAPI";


export default async function registerUser(data: SignUpInputs) {
	const { name, email, startDate, endDate, password, repeatPassword, terms } = data;

	const sendingData = {
		name,
		email,
		education_start_date: startDate,
		education_end_date: endDate,
		password,
		password_confirmation: repeatPassword,
		terms,
	};

	try {
		const res = await (await authFetchAPI()).post("/api/register", sendingData)

		// const res = await fetch("/api/register", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(sendingData),
		// });

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}
		const token = await res.json();

		await cookieStore.set("accessToken", token.accessToken);

		return res

	} catch (err) {
		console.error(err);
		return null;
	}
}
