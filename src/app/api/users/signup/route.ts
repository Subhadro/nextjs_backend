import {connect} from "@/dbConfig/dbConfig"
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";
import { User } from "@/models/user.model";

await connect();

//Export an async function called POST that takes a NextRequest as an argument
export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const {username, email, password} = reqBody;
		//Validation

		console.log("Request body:", reqBody);
		const user = await User.findOne({email});
		if (user) {
			return NextResponse.json(
				{message: "User already exists"},
				{status: 400}
			);
		}
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});
		console.log("New user object before save:", newUser);
		const savedUser = await newUser.save();
		console.log("Saved user:", savedUser);

		//send verification sendEmail
		try {
			await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});
		} catch (emailError) {
			console.error("Error sending verification email:", emailError);
			// Continue with the signup process even if email fails
		}

		return NextResponse.json({
			message: "User registered successfully",
			success: true,
			savedUser,
		});
	} catch (error) {
		console.error("Detailed error:", error);
		return NextResponse.json(
			{
				message: "Something went wrong at signup route", 
				error: error instanceof Error ? error.message : String(error)
			},
			{status: 500}
		);
    }
}
