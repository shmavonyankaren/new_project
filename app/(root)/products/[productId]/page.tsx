"use client";

import { ProductType } from "@/types";
import fetchSingleProduct from "@/utils/fetchSingleProduct";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const [item, setItem] = useState<ProductType | null>(null);
  const { productId } = use(params);

  useEffect(() => {
    fetchSingleProduct(productId)
      .then((data) => {
        setItem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);
  if (!item) {
    return (
      <div className="product-page-container">
        <div className="product-loading">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="product-page-container">
      <div className="product-page-content">
        <div className="product-image-section">
          <Image
            alt={item.name}
            src={item.picture}
            width={600}
            height={600}
            className="product-page-image"
          />
        </div>
        <div className="product-details-section">
          <h1 className="product-page-title">{item.name}</h1>
          <p className="product-page-description">{item.description}</p>
          <div className="product-page-price">${item.price}</div>
          <button className="product-page-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
