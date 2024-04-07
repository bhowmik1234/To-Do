import connect from "../../../../database/db.config";
import User from "../../../../model/user.model"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';


// connect()
export async function POST(request: NextRequest){
    try{
        connect()
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        console.log(reqBody);
        console.log("caught0");
        const user = await User.findOne({email});
        // // console.log("caught1");
        if(user)
        {
            return NextResponse.json({error: "User prsent in the data base"}, {status:400});
        }
        // hashPassword
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);


        const newUser = new User({
            username, 
            email,
            password: hashPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // await sendEmail({email, emailType:'VERIFY', userId: savedUser._id});

        return NextResponse.json({
            message: "User saved successfully",
            success: true,
        
        });

    }catch(error:any)
    {
        return NextResponse.json({error: error.message }, {status: 500})
    }
}