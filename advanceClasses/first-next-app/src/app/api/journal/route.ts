import Journal from "@/models/journal.model";
import { verifyJWT } from "@/utils/auth";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import z from "zod"

const reqSchema = z.object(
    {
        title: z.string(),
        mood: z.enum(["happy", "sad", "neytral", "angry", "awesome", "tired", "confused", "scared"] ),
        content: z.string().min(10).max(10000),
        date: z.coerce.date(),
    }
)

export type user = {
    _id: string;
    name: string;
    email: string
}

export async function POST(req: NextRequest){
    try {
        await dbConnect()
        const {_id} = await verifyJWT(req)
        const body = await req.json()
        const parsedBody = reqSchema.safeParse(body)
        if(!parsedBody.success){
            console.error(parsedBody.error.format())
            return NextResponse.json({
                success: false,
                error: "Invalid Inputs"
            }, {status: 400})
        }


        const journal = await Journal.create({...(parsedBody.data), userId: _id})

        if(!journal){
            return NextResponse.json({
                success: false,
                error: "Journal creation failed"
            }, {status: 500})
        }

        return NextResponse.json({
                success: true,
                message: "Journal created successfully",
                data: journal
            }, {status: 201})

    } catch (error) {
        console.error("Error while creating journal: ",error)
        return NextResponse.json({
                success: false,
                error
            }, {status: 400})
    }
}


export async function GET(req: NextRequest){
    try {
        await dbConnect()
    const user: user = await verifyJWT(req)
    
        if(!user){
            return NextResponse.json(
                {
                    success: false,
                    message: "Decode token failed"
                }
            )
        }
        const {_id} = user;
    
        const journals = await Journal.find({userId: _id})
        if(!journals){
            console.error("No journals saved until now")
            return NextResponse.json(
                {
                    success: true,
                    message: "No Journals Found"
                }
            )
        }

        return NextResponse.json(
            {
                success: true,
                message: "User journals fetched",
                data: journals
            }
        )
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            {
                success: false,
                error
            },
            {
                status: 5
            }
        )
    }
}

