import { getDataFromToken} from "@/helper/getdatafromtoken"
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const contentData = "";
        return NextResponse.json({
            mesaaage: "User found",
            data: {res: userId}
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}