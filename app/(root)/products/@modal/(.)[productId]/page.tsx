"use client";

import Image from "next/image";
import Modal from "@/components/products/Modal";
import { ProductType } from "@/types";
import fetchProducts from "@/utils/fetchProducts";
import { use, useEffect, useState } from "react";
import fetchSingleProduct from "@/utils/fetchSingleProduct";

export default function ProductModal({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = use(params);
  const [item, setItem] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSingleProduct(productId)
      .then((data) => {
        setItem(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <Modal>
        <div className="modal-loading">Loading...</div>
      </Modal>
    );
  }

  if (!item) {
    return (
      <Modal>
        <div className="modal-error">Product not found</div>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className="modal-content">
        <Image
          alt={item.name}
          src={item.picture}
          width={360}
          height={240}
          className="modal-image"
        />
        <div className="modal-info">
          <h2 className="modal-title">{item.name}</h2>
          <p className="modal-description">{item.description}</p>
          <p className="modal-price">${item.price}</p>
        </div>
      </div>
    </Modal>
  );
}
