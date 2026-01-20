import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function Product({ item }: { item: ProductType }) {
  return (
    <div className="product-card w-sm">
      <div className="product-image-wrap">
        <Image
          src={item.picture}
          alt={item.name}
          width={320}
          height={240}
          className="product-image"
        />
        <span className="product-price-tag">${item.price}</span>
      </div>
      <div className="product-info">
        <h4 className="product-title">{item.name}</h4>
        <div className="product-actions">
          <Link href={`/products/${item.id}`} className="product-button">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
