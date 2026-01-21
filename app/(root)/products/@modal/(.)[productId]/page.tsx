"use client";

import Image from "next/image";
import Modal from "@/components/products/Modal";
import { ProductType } from "@/types";
import fetchProducts from "@/utils/fetchProducts";
import { MouseEvent, use, useEffect, useState } from "react";
import fetchSingleProduct from "@/utils/fetchSingleProduct";
import { useAppDispatch } from "@/redux/hooks";
import { add } from "@/redux/features/bucket/bucketSlice";

export default function ProductModal({
  params,
}: {
  params: Promise<{ productId: number }>;
}) {
  const { productId } = use(params);
  const [item, setItem] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch()

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

  const addProductHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (item)
      dispatch(add(item));
  };

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
        <div className="flex justify-center items-center">
          <Image
            alt={item.name}
            src={item.picture}
            width={500}
            height={240}
            className="modal-image max-h-[400px]"
          />
        </div>
        <div className="modal-info">
          <h2 className="modal-title">{item.name}</h2>
          <p className="modal-description">{item.description}</p>
          <div>
            <p className="modal-price">${item.price}</p>
            <button type="button" onClick={addProductHandler} className="product-page-button">Add to Cart</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
