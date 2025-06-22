import { connect } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import { getDataFromToken } from "@/helpers/getDataFromToken";

await connect();

export async function POST(request: NextRequest) {
    try {

        const id = await getDataFromToken(request);
        const user = await User.findById({ _id: id }).select("-password");
        //check if there is no User

        if (!user) {
            return NextResponse.json({
                message: "user not found",
                status: 404
            })
        }
        return NextResponse.json({
            message: "user found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}