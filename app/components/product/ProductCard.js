import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import ProductRating from "./ProductRating";
import ProductStar from "./ProductStar";

export default function ProductCard({ product }) {
  return (
    <div className="hover:scale-105 delay-75 m-2 relative w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href={`/product/${product.slug}`}
      >
        <Image
          className="object-cover"
          src={product?.images[0]?.secure_url}
          alt={product.title}
          width={300}
          height={300}
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          39% OFF
        </span>
      </Link>
      <div className="mt-4 px-5 pb-5  w-full">
        <Link href={`/product/${product.slug}`} className="flex h-14 items-center">
          <h5 className="text-xl font-semibold tracking-tight text-slate-900">{product.title}</h5>
        </Link>
        <div className="mt-2 mb-5 w-full  items-center justify-between flex">
          <p className=" flex flex-col me-2">
            <span className="text-3xl font-bold text-slate-900">
              ${product.price}
            </span>
            <span className="text-sm text-slate-900 line-through">
              ${product.price}
            </span>
          </p>
          <ProductStar product={product} />
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <FiShoppingCart className="text-xl mr-2"/>
          Add to cart
        </Link>
      </div>
    </div>
  );
}
