import Pagination from "./components/product/Pagination";
import ProductCard from "./components/product/ProductCard";
import ProductImage from "./components/product/ProductImage";

async function getProducts(searchParams) {
  const seacrhQuery = new URLSearchParams({
    page: searchParams?.page || 1,
  }).toString();

  const response = await fetch(`${process.env.API}/product?${seacrhQuery}`,{
   method: 'GET',
   next:{revalidate: 1},
  });
  if (!response.ok) {
    throw new Error("Fail",response.statusText);
  }
  const data = await response.json();
  return data;
}


export default async function Home({searchParams}) {
  const {products,currentPage,totalPages} = await getProducts(searchParams);
  return (
    <main className="flex container min-h-screen flex-col items-center justify-between py-12">
      <h1>HOME</h1>
      <div className="">
        <h2>Products</h2>
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
           
      <Pagination  totalPages={totalPages} currentPage={currentPage} pathname="/"/>
    </main>
  );
}
