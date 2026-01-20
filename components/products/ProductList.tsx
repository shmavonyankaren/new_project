import { ProductType } from "@/types"
import Product from "./ProductItem"

export default function ProductList({ list }: { list: ProductType[] }) {
	return (
		<div className="grid grid-rows-2  grid-flow-col  gap-4 p-7">
			{list.map((item => {
				return (
					<Product key={item.id} item={item} />
				)
			}))}
		</div>
	)
}