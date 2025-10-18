import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const reqSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "Min length 6 required for password")
    .max(20, "Max length 20 for password"),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const parsedBody = reqSchema.safeParse(body);

    if (!parsedBody.success) {
      console.error("Invalid Input");
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Input",
        },
        { status: 400 }
      );
    }

    const { email, password } = parsedBody.data;

    const user = (await User.findOne({ email }))
    console.log(user);
    if (!user) {
      console.error("User not found");
      return NextResponse.json(
        {
          success: false,
          error: "User not found with this email",
        },
        { status: 404 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.error("Password is not correct");
      return NextResponse.json(
        {
          success: false,
          error: "Password is not correct",
        },
        { status: 300 }
      );
    }

    if (!process.env.SECRET_KEY) {
      console.error("Secret key not found");
      return;
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    const response = NextResponse.json({
      success: true,
      message: "User logged in successfully",
      data: user,
    }, {status: 200});

    response.cookies.set("token", token, options)
    return response
  } catch (error) {
    console.error("Failure while logging in");
    return NextResponse.json(
      {
        success: false,
        error: `Log in failed: ${error}`,
      },
      { status: 404 }
    );
  }
}
