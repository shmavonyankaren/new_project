export default async function fetchProducts() {

	try {
		const token = await cookieStore.get("accessToken");
		const res = await fetch(`api/products`, {
			method: "GET",
			credentials: "include",
			headers: {
				"Accept": "application/json",
				"Authorization": `Bearer ${token?.value}`
			},
		});

		return res.json();
	} catch (err) {
		console.log(err)
	}
}