import { ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function Product({ item }: { item: ProductType }) {
	console.log(item)
	return (
		<div className="flex justify-center items-center">
			<div className="selling-item">
				<Image src={item.picture} alt={item.name} width={150} height={150} className="selling-item-image" />
				<div className="flex justify-center items-center">
					<h4 className="selling-item-name">{item.name}</h4>
				</div>
				<div className="flex justify-between">
					<div className="flex justify-center items-center">
						<p className="selling-item-price">{item.price}$</p>
					</div>
					<Link href={{ pathname: `products/${item.id}`, query: item }} className="selling-item-description">Details</Link>
				</div>
			</div>
		</div >
	)
}