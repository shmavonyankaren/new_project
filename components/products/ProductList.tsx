import { ProductType } from "@/types";
import Product from "./ProductItem";
import { useAppSelector } from "@/redux/hooks";

export default function ProductList() {
  const list: ProductType[] = useAppSelector(state => state.products.products)
  return (
    <div className="flex flex-1 justify-center items-center gap-7 w-full flex-wrap p-7">
      {list.map((item) => {
        return <Product key={item.id} item={item} />;
      })}
    </div>
  );
}
