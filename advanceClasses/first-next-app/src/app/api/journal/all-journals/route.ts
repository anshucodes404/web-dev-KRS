import Journal from "@/models/journal.model"
import dbConnect from "@/utils/dbConnect"
import { NextResponse } from "next/server"


export async function GET(){
    try {
        await dbConnect()
        console.log("All journals request came")
        const journals = await Journal.find()
        if(!journals){
            console.log("No journals exist")
            return NextResponse.json(
                {
                    success: true,
                    message: "No journals exist"
                },
                {
                    status: 200
                }
            )
        }
        console.log(journals)

        return NextResponse.json(
            {
                success: true,
                message: "Jornals successfully fetched",
                data: journals
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: `Error while fetching all journals, ${error}`
            }
        )
    }
}