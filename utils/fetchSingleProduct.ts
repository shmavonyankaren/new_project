import { ProductType } from "@/types";

export default async function fetchSingleProduct(productId: number) {
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
    const products = await res.json();

    const product = products.find((product: ProductType) => {

      return String(product.id) === String(productId);
    });

    // console.log("fetchSingleProduct found product:", product);

    return product;
  } catch (err) {
    console.log(err);
  }
}
