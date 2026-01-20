"use client";

import fetchPaginatedProducts from "@/utils/fetchPaginatedProducts";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";
import { PaginatedProductsType } from "@/types";

export default function HomePageContainer() {
  const [paginationData, setPaginationData] =
    useState<PaginatedProductsType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    <div className="bg-white w-full h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : paginationData ? (
        <>
          <ProductList list={paginationData.data} />
          <div className="flex justify-center items-center p-4 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {paginationData.last_page}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === paginationData.last_page}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}
