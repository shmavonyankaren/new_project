"use client";

import fetchPaginatedProducts from "@/utils/fetchPaginatedProducts";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { PaginatedProductsType } from "@/types";
import { useSearchParams } from "next/navigation";

export default function HomePageContainer() {
  const [paginationData, setPaginationData] =
    useState<PaginatedProductsType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  console.log('searchParams ->', searchParams)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function fetchData() {
      setLoading(true);
      fetchPaginatedProducts(currentPage)
        .then((data) => {
          setPaginationData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    if (paginationData && currentPage < paginationData.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-transparent w-full h-full flex-1 flex">
      {loading ? (
        <div className="flex justify-center items-center flex-1">
          <p>Loading...</p>
        </div>
      ) : paginationData ? (
        <div className="flex flex-1 flex-col justify-between">
          <ProductList list={paginationData.data} />
          <div className="flex justify-center items-center p-4 space-x-4 bg-purple-800">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded disabled:cursor-c disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {paginationData.last_page}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === paginationData.last_page}
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}
