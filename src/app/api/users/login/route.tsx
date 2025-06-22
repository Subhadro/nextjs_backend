import {connect} from "@/dbConfig/dbConfig"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";
import { User } from "@/models/user.model";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }
        console.log("user exists");

        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"}, {status:400})
        }
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1h'})
        const res = NextResponse.json({
            message:"Logged In Success",
            success:true
        })
        res.cookies.set("token",token,{
            httpOnly:true
        })
        return res
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}