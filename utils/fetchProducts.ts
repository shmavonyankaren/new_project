export default async function fetchProducts() {
  try {
    const token = await cookieStore.get("accessToken");
    const res = await fetch(`/api/products`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });
    console.log("fetchProducts response:", res);
    return res.json();
  } catch (err) {
    console.log(err);
  }
}
