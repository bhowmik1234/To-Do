import { NextRequest, NextResponse } from "next/server";
import User from "@/model/user.model";
import connect from "@/database/db.config";

connect();
export async function POST(request: NextRequest){
    try{
        const {username} = await request.json();
        console.log(username);
        const user = await User.findOne({username});
        if(!user)
            {
                return NextResponse.json({
                    message: "user not found",
                })
            }
        return NextResponse.json({
            message: "user found",
        })

    }catch(error: any){
        return NextResponse.json({
            message: error.message,
        })
    }
}