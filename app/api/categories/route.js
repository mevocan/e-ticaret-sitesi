import Category from "@/models/Category";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConnect();
    try {
      const categories = await Category.find({}).sort({ createdAt: -1 });
      return NextResponse.json(categories);
    } catch (err) {
      return NextResponse.json(err.message, { status: 500 });
    }
  }