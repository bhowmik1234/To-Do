import { NextRequest, NextResponse } from "next/server";
import {Content} from "@/model/conten.model";
import connect from "@/database/db.config";
import User from "@/model/user.model";

connect();
export async function GET(request: NextRequest){
    try {
        const params = request.nextUrl.searchParams;
        const username = params.get("name");
        console.log(`${username} ${typeof username}`)
        console.log("data part");
        const user = await User.findOne({username:"Bhowmik"});
        if(!user) {
            return NextResponse.json({
                message:"user not found"
            })
        }

        const content = await Content.find({user:user._id}).sort({ createdAt: -1 });;
        console.log(content);

        return NextResponse.json({
            message: "got msg",
            data:content
        })
    } catch (error) {
        return NextResponse.json({
            message: "not got msg",

        })
    }
}