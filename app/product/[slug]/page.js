import ProductImage from "@/app/components/product/ProductImage";
import ProductRating from "@/app/components/product/ProductRating";
import ProductStar from "@/app/components/product/ProductStar";

async function getProduct(slug) {
  const response = await fetch(`${process.env.API}/product/${slug}`, {
    method: "GET",
    next: { revalidate: 1 },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  
  return data;
}

export default async function ProductViewPage({ params }) {
  const product = await getProduct(params?.slug);

  return (
    // <div className="container h-full">
    //   <ProductImage product={product}/>
    //   <h1>{product[0].title}</h1>
    //   <p>{product[0].description}</p>
    // </div>
    <div className="">
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] relative overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 ">
              <ProductImage product={product} />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product[0].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
              ante justo. Integer euismod libero id mauris malesuada tincidunt.
            </p>
            <div className="mb-4">
              <div className="mr-4 mb-4">
                <span className=" dark:text-gray-300 text-3xl font-bold">
                  ${product[0].price}
                </span>
              </div>
              <div className="mb-4 font-bold ">
                <span className="text-xl mr-1 text-gray-700 dark:text-gray-300">
                  Availability: 
                </span>
                <span className="text-gray-600 text-xl dark:text-gray-300">
                  { product[0].stock}
                </span>
              </div>
              <div className="">
                  <ProductStar product={product[0]} />
              </div>
            </div>
           
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p
                className="text-gray-600 dark:text-gray-300 text-sm mt-2"
                dangerouslySetInnerHTML={{
                  __html: product[0].description.replace(/\./g, ".<br><br>")
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <ProductRating product={product}/>
    </div>
    </div>
  );
}
