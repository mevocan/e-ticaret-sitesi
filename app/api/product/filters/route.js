import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import Product from "@/models/product";
import queryString from "query-string";
import product from "@/models/product";

export async function GET(req) {
  await dbConnect();

  const searchParams = queryString.parseUrl(req.url).query;

  const { page, minPrice, maxPrice, ratings, category, tag, brand } =
    searchParams || {};
  const pageSize = 6;

  const filter = {};

  if (category) {
    filter.category = category;
  }
  if (tag) {
    filter.tag = tag;
  }
  if (brand) {
    filter.brand = brand;
  }
  if (minPrice || maxPrice) {
    filter.price = {
      $gte: minPrice || 0,
      $lte: maxPrice || 0,
    };
  }

  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    const allProducts = await Product.find(filter)
      .populate("category","name")
      .populate("tags","name")
      .populate("brand")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

      // function to calculate the avareeg raiting for each product
    const calculateAverageRating = (ratings) => {
        if(ratings.length === 0){
          return 0;
        }
        let totalRating = 0;

        ratings.map((rating) => {
          totalRating += rating.rating;
        });

        return totalRating / ratings.length;
    }

    const productsWithAverageRating = allProducts.map((product) => ({
      ...product.toObject(),
        averageRating: calculateAverageRating(product.ratings), 
    }));

    const filteredProducts = productsWithAverageRating.filter((product) => {
        if(!ratings){
            return true;
        }
        const targetRating = Number(ratings);
        const differnce = product.averageRating - targetRating;
        return differnce >= -0.5 && differnce <= 0.5 ; // (4) [3.5, 4, 4.5]
    });

    const  totalFilteredProducts = filteredProducts.length;

    const paginatedProducts = filteredProducts.slice(skip, skip + pageSize);

    return NextResponse.json({
      products: paginatedProducts,
      currentPage,
      totalPages: Math.ceil(totalFilteredProducts / pageSize),
    },{status: 200});

  } catch (error) {
    console.log("filter error", error);
    return NextResponse.error({
      status: 400,
      message: error.message,
    });
  }
}
