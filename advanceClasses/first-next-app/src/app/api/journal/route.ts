import Journal from "@/models/journal.model";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import z from "zod"

const reqSchema = z.object(
    {
        title: z.string(),
        mood: z.enum(["happy", "sad", "neytral", "angry", "awesome", "tired", "confused", "scared"] ),
        content: z.string().min(10).max(10000),
        date: z.date()
    }
)

export async function POST(req: NextRequest){
    try {
        await dbConnect()
        const body = await req.json()
        const parsedBody = reqSchema.safeParse(body)
        if(!parsedBody.success){
            console.error("Inputs invalid")
            return NextResponse.json({
                success: false,
                error: "Invalid Inputs"
            }, {status: 400})
        }

        // const {title, mood, content, date} = parsedBody.data

        const journal = await Journal.create(parsedBody.data)

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