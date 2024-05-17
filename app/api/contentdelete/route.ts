import { NextRequest, NextResponse } from "next/server";
import { Content } from "@/model/conten.model"

export async function GET(request: NextRequest){
    try {
        const params = request.nextUrl.searchParams;
        const id = params.get("id");
        console.log(id);
        const res = await Content.findByIdAndDelete(id);
        console.log(res);
        return NextResponse.json({
            message: "content delete",
        })
    } catch (error) {
        return NextResponse.json({
            message:"could not delete"
        })
    }
}