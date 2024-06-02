import { Button } from "@/components/ui/button";
import Pagination from "../components/product/Pagination";
import ProductCard from "../components/product/ProductCard";
import ProductFilter from "../components/product/ProductFilter";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams.page || 1,
    minPrice: searchParams.minPrice || "",
    maxPrice: searchParams.maxPrice || "",
    ratings: searchParams.ratings || "",
    category: searchParams.category || "",
    tag: searchParams.tag || "",
    brand: searchParams.brand || "",
  }).toString();

  try {
    const response = await fetch(
      `${process.env.API}/product/filters?${searchQuery}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.products)) {
      throw new Error("No products returned");
    }

    return data;
  } catch (err) {
    console.log(err);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
}

export default async function Shop({ searchParams }) {
  const { products, currentPage, totalPages } = await getProducts(searchParams);
  const params = searchParams;
  return (
    <div className="container my-5 min-h-96">
      <div className="grid grid-cols-12">
        <div className=" col-span-3 overflow-y-scroll " style={{ maxHeight: "90vh" }}>
          <div className="flex justify-between">
          <h4 className="text-center font-bold  mt-3 ">Filter Products</h4>
          <Button variant="outline" className=" text-white m-1 p-0">
          <Link href="/shop" className=" text-red-500 p-4">
          <h5>Clear Filter</h5></Link>
          </Button></div>
          
          <ProductFilter params={params} />
        </div>
        <div className=" col-start-4 col-span-9 overflow-auto ml-2">
          <h4 className="text-center font-bold text-2xl  mt-3">Shop Latest Products</h4>
          
          <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 items-center">
            {products?.map((product) => (
              <div className="items-center justify-center flex" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <br />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
            pathname="/shop"
          />
        </div>
      </div>
    </div>
  );
}
