"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { BucketProductType, ProductType } from "@/types";
import Product from "./products/ProductItem";
import { MouseEvent } from "react";
import { remove, removeAll } from "@/redux/features/bucket/bucketSlice";

export default function Bucket() {
	const products: BucketProductType[] = useAppSelector((state) => state.bucketProducts.products);
	const dispatch = useAppDispatch();


	const deleteAllHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		dispatch(removeAll())
	}
	const price = products.reduce((total: number, product: BucketProductType) => {
		return total + parseFloat(product.price);
	}, 0); //

	if (!products.length) {
		return <div className="flex justify-center items-center flex-1 text-white">
			<p>Empty</p>
		</div>
	}


	return <div className="flex-1 flex justify-between flex-col">
		{products.map((product, index) => {
			const removeProductHandler = (e: MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				console.log(product.id, typeof product)
				dispatch(remove(Number(product.bucketId)));
			};

			return (<div key={`${product.id} + ${index}`} className="pl-5 pt-5 flex justify-between w-ful gap-5">
				<Product item={product} />
				<div className="flex justify-center items-center pr-15">
					<button type="button" onClick={removeProductHandler} className="text-center flex justify-center items-center text-white cursor-pointer p-2 rounded  bg-red-500">X</button>
				</div>
			</div>)

		})}

		<div className="flex justify-around text-white pt-9 pb-9 mt-5 bg-purple-950">
			<p>Total Count: {products.length}</p>
			<p>Total Price: {price}$

			</p>
			<button onClick={deleteAllHandler} className="bg-red-500 rounded-4xl p-3 cursor-pointer">Delete All</button>
		</div>
	</div>
}