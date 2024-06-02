import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect();
    const body = await req.json();
    try {
        const { name , email, password } = body;
        await new User({
            name,
            email,
            password: await bcrypt.hash(password, 10),
        }).save();
        return NextResponse.json({success:'Registered successfully'});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message},{ status: 500});
    }
}