"use client"

import fetchProducts from "@/utils/fetchProducts";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function HomePageContainer() {
	const [list, setList] = useState([]);


	useEffect(() => {
		fetchProducts().then((data => {

			// if (data.status === 200) {
			setList(data)

		})).catch(err => {
			console.log(err)
		});
	}, []);


	return (
		<div className="bg-white w-full h-full">
			<ProductList list={list} />
		</div>
	)
}