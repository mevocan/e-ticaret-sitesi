"use client";
import { priceRanges } from "@/utils/filterData";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Stars from "./Stars";
import { useCategory } from "@/context/category";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useTag } from "@/context/tag";
import { useProduct } from "@/context/product";

export default function PrdouctFilter({ params }) {
  const pathname = "shop";
  const { minPrice, maxPrice, category, tag, brand, rating } = params;

  const { fechtCategoriesPublic, categories } = useCategory();

  const { fetchTagsPublic, tags } = useTag();

  const { fetchBrands, brands } = useProduct();

  const [isOpen, setIsOpen] = useState(true);
  const [isOpenPrice, setIsOpenPrice] = useState(true);
  const [isOpenRating, setIsOpenRating] = useState(false);
  const [isOpenTags, setIsOpenTags] = useState(false);
  const [isOpenBrand, setIsOpenBrand] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleOpenPrice = () => {
    setIsOpenPrice(!isOpenPrice);
  };
  const handleOpenRating = () => {
    setIsOpenRating(!isOpenRating);
  };
  const handleOpenTags = () => {
    setIsOpenTags(!isOpenTags);
  };
  const handleOpenBrand = () => {
    setIsOpenBrand(!isOpenBrand);
  };

  useEffect(() => {
    async function fetchData() {
      await fechtCategoriesPublic();
      await fetchTagsPublic();
      await fetchBrands();
      setIsLoading(false);
    }
    fetchData();     
  }, []);

  const router = useRouter();

  const activeButton = "bg-slate-500 text-white m-1 px-0";
  const button = "bg-white text-slate-500 m-1 px-0";

  const handleRemoceFilter = (filterName) => {
    const updatedSearchParams = { ...params };
    if (typeof filterName === "string") {
      delete updatedSearchParams[filterName];
    }

    filterName?.forEach((name) => {
      delete updatedSearchParams[name];
    });
    // reset the page to 1
    updatedSearchParams.page = 1;

    const queryString = new URLSearchParams(updatedSearchParams).toString();
    const newUrl = `/${pathname}?${queryString}`;
    router.push(newUrl);
  };

  return (
    <>
    
      <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
         <div className="mb-2">
          <h5
            className=" text-center bg-slate-200 font-bold p-2"
            onClick={handleOpen}
          >
            Category
            {isOpen ? (
              <MdKeyboardArrowUp className="inline-block ml-1" />
            ) : (
              <MdKeyboardArrowDown className="inline-block ml-1" />
            )}
          </h5>
          <div
            className={`transition-[max-height] duration-500 ease-out overflow-hidden ${
              isOpen ? " max-h-96" : "max-h-0"
            }  w-full `}
          >
            {categories?.map((c) => {
              const isActive = category === c._id;
              const url = {
                pathname,
                query: {
                  ...params,
                  category: c?._id,
                  page: 1,
                },
              };
              return (
                <div key={c._id} className="">
                  <Button
                    variant="outline"
                    className={isActive ? activeButton : button}
                  >
                    <Link href={url} className="flex my-2 w-full p-4">
                      {c?.name}
                    </Link>
                  </Button>
                  {isActive && (
                    <Button
                      variant="outline"
                      className="bg-red-500 text-white m-1"
                      onClick={() => handleRemoceFilter(["category"])}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {category && (
          <div className="mb-2">
            <h5
              className=" text-center bg-slate-200 font-bold p-2"
              onClick={handleOpenTags}
            >
              Tags
              {isOpenTags ? (
                <MdKeyboardArrowUp className="inline-block ml-1" />
              ) : (
                <MdKeyboardArrowDown className="inline-block ml-1" />
              )}
            </h5>
            <div
              className={`transition-[max-height] duration-500 ease-out overflow-hidden ${
                isOpenTags ? " max-h-96" : "max-h-0"
              }  w-full `}
            >
              {tags
                ?.filter((t) => t?.parentCategory === category)
                ?.map((t) => {
                  const isActive = tag === t._id;
                  const url = {
                    pathname,
                    query: {
                      ...params,
                      tag: t?._id,
                      page: 1,
                    },
                  };
                  return (
                    <div key={t._id} className="">
                      <Button
                        variant="outline"
                        className={isActive ? activeButton : button}
                      >
                        <Link href={url} className="flex my-2 w-full p-4">
                          {t?.name}
                        </Link>
                      </Button>
                      {isActive && (
                        <Button
                          variant="outline"
                          className="bg-red-500 text-white m-1"
                          onClick={() => handleRemoceFilter(["tag"])}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <div className="mb-2">
          <h5
            className=" text-center bg-slate-200 font-bold p-2"
            onClick={handleOpenPrice}
          >
            Price
            {isOpenPrice ? (
              <MdKeyboardArrowUp className="inline-block ml-1" />
            ) : (
              <MdKeyboardArrowDown className="inline-block ml-1" />
            )}
          </h5>
          <div
            className={`transition-[max-height] duration-500 ease-out overflow-hidden ${
              isOpenPrice ? " max-h-96" : "max-h-0"
            }  w-full `}
          >
            {priceRanges?.map((range) => {
              const url = {
                pathname,
                query: {
                  ...params,
                  minPrice: range?.min,
                  maxPrice: range?.max,
                  page: 1,
                },
              };
              const isActive =
                minPrice === String(range?.min) &&
                maxPrice === String(range?.max);
              return (
                <div key={range.label} className="">
                  <Button
                    variant="outline"
                    className={isActive ? activeButton : button}
                  >
                    <Link href={url} className="flex my-2 w-full p-4">
                      {range?.label}{" "}
                    </Link>
                  </Button>
                  {isActive && (
                    <Button
                      variant="outline"
                      className="bg-red-500 text-white m-1"
                      onClick={() =>
                        handleRemoceFilter(["minPrice", "maxPrice"])
                      }
                    >
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-2">
          <h5
            className=" text-center bg-slate-200 font-bold p-2"
            onClick={handleOpenRating}
          >
            Rating
            {isOpenRating ? (
              <MdKeyboardArrowUp className="inline-block ml-1" />
            ) : (
              <MdKeyboardArrowDown className="inline-block ml-1" />
            )}
          </h5>
          <div
            className={`transition-[max-height] duration-500 ease-out overflow-hidden ${
              isOpenRating ? " max-h-96" : "max-h-0"
            }  w-full `}
          >
            {[5, 4, 3, 2, 1].map((ratingValue) => {
              const isActive = String(rating) === String(ratingValue);
              const url = {
                pathname,
                query: {
                  ...params,
                  rating: ratingValue,
                  page: 1,
                },
              };
              return (
                <div key={ratingValue} className=" justify-center items-center">
                  <Button
                    variant="outline"
                    className={isActive ? activeButton : button}
                  >
                    <Link href={url} className="flex my-2 w-full p-4">
                      <Stars rating={ratingValue} />
                    </Link>
                  </Button>
                  {isActive && (
                    <Button
                      variant="outline"
                      className="bg-red-500 text-white m-1"
                      onClick={() => handleRemoceFilter(["rating"])}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-2">
          <h5
            className=" text-center bg-slate-200 font-bold p-2"
            onClick={handleOpenBrand}
          >
            Brands
            {isOpenBrand ? (
              <MdKeyboardArrowUp className="inline-block ml-1" />
            ) : (
              <MdKeyboardArrowDown className="inline-block ml-1" />
            )}
          </h5>
          <div
            className={`transition-[max-height] duration-500 ease-out overflow-hidden ${
              isOpenBrand ? " max-h-96" : "max-h-0"
            }  w-full `}
          >
                      
            {brands.brands?.map((b) => {
              const isActive = brand === b;
             
              const url = {
                pathname,
                query: {
                  ...params,
                  brand: b,
                  page: 1,
                },
              };
              return (
                <div key={b} className="">
                  <Button
                    variant="outline"
                    className={isActive ? activeButton : button}
                  >
                    <Link href={url} className="flex my-2 w-full p-4">
                      {b}
                    </Link>
                  </Button>
                  {isActive && (
                    <Button
                      variant="outline"
                      className="bg-red-500 text-white m-1"
                      onClick={() => handleRemoceFilter(["brand"])}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        </>
      )}
       
      </div>
    </>
  );
}
