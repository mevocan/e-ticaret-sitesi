import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import Product from "@/models/product";
import queryString from "query-string";

export async function GET(req) {
    await dbConnect();
    
    const searhParams = queryString.parseUrl(req.url).query;
    const {page} = searhParams || {};
    const pageSize = 6;

    try {
        
        const currentPage = Number(page) || 1;
        const skip = (currentPage - 1) * pageSize;
        const totalProducts = await Product.countDocuments({});
        const products = await Product.find().skip(skip).limit(pageSize).sort({createdAt: -1});

        return NextResponse.json({
            products,
            currentPage,
            totalPages: Math.ceil(totalProducts / pageSize)
        });

    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }

}