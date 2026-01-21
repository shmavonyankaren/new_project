import { SignInInputs, SignUpInputs } from "@/types";

export default async function authFetchAPI() {

	return {
		post: async function (path: string, data: SignInInputs | SignUpInputs) {
			return await fetch(path, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			});

		}
	}
}