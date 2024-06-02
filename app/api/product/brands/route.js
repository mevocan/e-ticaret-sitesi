import product from "@/models/product";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";


export async function GET(req){
    await dbConnect();

    try {
        const brands = await product.distinct('brand');
        return NextResponse.json({brands});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Errrrroorr'},{ status: 500});
    }
}