import { ProductType } from "@/types";
import Product from "./ProductItem";

export default function ProductList({ list }: { list: ProductType[] }) {
  return (
    <div className="flex justify-center items-center gap-7 w-full flex-wrap p-7">
      {list.map((item) => {
        return <Product key={item.id} item={item} />;
      })}
    </div>
  );
}
