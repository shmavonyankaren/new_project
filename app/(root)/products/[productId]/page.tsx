import { ProductType } from "@/types";
import Image from "next/image";

export default async function ProductPage({
	params,
	item,
}: {
	item: ProductType
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="container mx-auto my-10">
			<div className="w-1/2 mx-auto">
				<div>
					<h1 className="text-center text-3xl font-bold my-4">{item.picture}</h1>
				</div>
				<Image
					alt={item.name}
					src={item.picture}
					className="w-full object-cover aspect-square "
				/>

				<div className="bg-white py-4">
					<h3>{item.description}</h3>
					<h3>{item.price}</h3>
				</div>
			</div>
		</div>
	);
}