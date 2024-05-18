import connect from "@/database/db.config";
import { NextRequest, NextResponse } from "next/server";
import {Content} from "@/model/conten.model";
import User from "@/model/user.model";

connect();
export async function POST(request: NextRequest)
{
    try{
        const reqBody = await request.json();
        const {userName, data} =  reqBody;
        console.log(userName);
        console.log(data, "upload");
        const user = await User.findOne({username: userName});
        console.log(user?._id);
        if(!user)
        {
            return NextResponse.json({
                message: "user not found",
            })
        }
        const id = user?._id;
        const list = new Content({
            content: data,
            user: id,
        });
        const savedContent = await list.save();
        console.log(savedContent);

        return NextResponse.json({
            message: "content addes successfully",
            success: true,
            data: savedContent
        })
    }
    catch(error:any)
    {
        return NextResponse.json({
            error: error,
        },{status: 500})
    }
}