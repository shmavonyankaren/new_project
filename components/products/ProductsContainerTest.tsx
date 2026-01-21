"use client";

import fetchPaginatedProducts from "@/utils/fetchPaginatedProducts";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { PaginatedProductsType } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/hooks";
import { initialise } from "@/redux/features/products/productsSlice"

export default function HomePageContainer() {
	// const [paginationData, setPaginationData] =
	// 	useState<PaginatedProductsType | null>(null);


	// const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useAppDispatch();


	const router = useRouter();
	const pathname = usePathname();


	// const currentPage = 1;
	const searchParams = useSearchParams();
	const page = Number(searchParams.get("page"));

	const { isPending, isError, data, error } = useQuery<PaginatedProductsType>({ queryKey: ["products", page], queryFn: () => fetchPaginatedProducts(page), enabled: !!page, })

	// useEffect(() => {
	// 	router.push(`?page=1`);
	// }, [router, dispatch, data]);


	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", newPage.toString());
		router.push(`${pathname}?${params.toString()}`);
	};

	const handleNextPage = () => {
		if (data && page < data.last_page) {
			// setCurrentPage(currentPage + 1);
			// router.push(`?page=${page + 1}`);
			handlePageChange(page + 1)
		}
	};

	const handlePrevPage = () => {
		if (page > 1) {
			// router.push(`?page=${page - 1}`);
			handlePageChange(page - 1)
			// setCurrentPage(currentPage - 1);
		}
	};
	useEffect(() => {
		if (data)
			dispatch(initialise(data?.data))
	},)



	// console.log('searchParams ->', searchParams)

	if (isPending) {
		return <div className="flex justify-center items-center flex-1">
			<p>Loading...</p>
		</div>
	}

	if (isError) {
		return <span>Error: {error.message}</span>
	}




	return (
		<div className="bg-transparent w-full h-full flex-1 flex">
			{data && (
				<div className="flex flex-1 flex-col justify-between">
					<ProductList />
					<div className="flex justify-center items-center p-4 space-x-4 bg-purple-800">
						<button
							onClick={handlePrevPage}
							disabled={page === 1}
							className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded disabled:cursor-c disabled:cursor-not-allowed disabled:bg-gray-400"
						>
							Previous
						</button>
						<span>
							Page {page} of {data.last_page}
						</span>
						<button
							onClick={handleNextPage}
							disabled={page === data.last_page}
							className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded disabled:cursor-not-allowed disabled:bg-gray-400"
						>
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
