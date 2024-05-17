import connect from "@/database/db.config";
import User from "@/model/user.model"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'


connect();
export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email});
        console.log(user);
        if(!user)
        {
            return NextResponse.json({
                error: "User not present"},
                {status: 400
            });
        }

        // check valid password
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword)
        {
            return NextResponse.json({error: "Invalid Password"}, {status: 500});
        }

        // tokendata
        const tokenData = {
            id:user._id,
            email:user.email,
            username: user.username,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRETS!, {expiresIn:"1h"});
        const response = NextResponse.json({
            message: {
                user,
                "login": "login successfull",
            },
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
        
    }catch(error: any)
    {
        return NextResponse.json({error: error.message}, {status:500})
    }
}