'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Pagination(
    {totalPages, currentPage, pathname}
) {
    const router = useRouter();
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              router.push(`${pathname}?page=${index + 1}`);
            }}
            className={`${
              currentPage === index + 1
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            } px-4 py-2 rounded`}
          >
            {index + 1}
          </button>
        ))}
      </div>
  )
}
