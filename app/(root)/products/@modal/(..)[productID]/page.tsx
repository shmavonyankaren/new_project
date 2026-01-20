import Image from "next/image";
import Modal from "@/components/products/Modal";
import { ProductType } from "@/types";

export default async function ProductModal({
	params,
	item
}: {
	params: Promise<{ id: string }>;
	item: ProductType
}) {
	const { id } = await params;

	return (
		<Modal>
			<Image
				alt={item.name}
				src={item.picture}
				className="w-full object-cover aspect-square"
			/>

			<div className="bg-white p-4">
				<h2 className="text-xl font-semibold">{item.name}</h2>
				<h3>{item.description}</h3>
				<h3>{item.price}</h3>
			</div>
		</Modal>
	);
}