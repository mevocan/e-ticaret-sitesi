import Product from "@/models/product";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { currentUser } from "@/utils/currentUser";

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { productId, rating, comment } = body;

  const user = await currentUser(req);
  

  try {
    const product = await Product.findById(productId);

    const existingRating = product.ratings.find(
      (rate) => rate.postedBy.toString() === user._id.toString()
    );

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.comment = comment;
        await product.save();

        return NextResponse.json(product);
    } 
    product.ratings.push({
        postedBy: user._id,
        rating,
        comment,
      });

      const updatedProduct = await product.save();

        return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json({error:"server errr"}, { status: 500 });
  }
}
