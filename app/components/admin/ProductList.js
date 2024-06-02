"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProduct } from "@/context/product";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Pagination from "../product/Pagination";
import Link from "next/link";


export default function ProductList() {
  const {
    products,
    currentPage,
    fetchProducts,
    totalPages,
    setUpdatingProduct,
  } = useProduct();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");

  useEffect(() => {
    fetchProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleClick = (product) => {
    setUpdatingProduct(product);
    router.push(`/dashboard/admin/product`);
  };

  return (
    <div className="flex-col items-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Product List
      </h1>
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            className="relative mt-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
            key={product._id}
          >
            <Link
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              href={`/product/${product.slug}`}
            >
              <Image
                className=" object-cover"
                src={product?.images[0]?.secure_url}
                alt={product?.title}
                width={1072}
                height={600}
              />{" "}
            </Link>
            <div className="mt-4 px-5 pb-5">
              <Link href={`/product/${product.slug}`}>
                <h5 className="text-xl line-clamp-2 tracking-tight text-slate-900">
                  {product.title}
                </h5>
              </Link>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                </p>
              </div>
              <Button
                className="flex w-full items-center justify-center bg-gray-900 px-2 py-1 text-sm text-white transition hover:bg-gray-700"
                onClick={() => handleClick(product)}
              >
                Update Product
              </Button>
            </div>
          </div>  
        ))}
      </div>

          <Pagination 
          totalPages={totalPages}
          currentPage={currentPage}
          pathname={pathname}
          />
      

    </div>
  );
}
