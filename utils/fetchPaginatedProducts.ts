import { PaginatedProductsType } from "@/types";

export default async function fetchPaginatedProducts(
  page: number = 1,
): Promise<PaginatedProductsType> {
  try {
    const token = await cookieStore.get("accessToken");
    const res = await fetch(`/api/products/paginate?page=${page}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    });
    console.log("fetchPaginatedProducts response:", res);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}
