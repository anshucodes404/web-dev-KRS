import Journal from "@/models/journal.model";
import dbConnect from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, {params}: {params: {_id: string}}){
   try {

    await dbConnect()
     const body = await req.json()

     if(!params._id || !body){
        return NextResponse.json(
            {
                success: false,
                error: "ID and updated journal required"
            }
        )
     }
 
     const updatedJournal = await Journal.findByIdAndUpdate(params._id, body, {new: true})

     console.log(updatedJournal)
     if(!updatedJournal){
        return NextResponse.json({
            success: false,
            error: "Updation of journal failed"
        })
     }

     return NextResponse.json({
            success: true,
            message: "Updated successfully",
            data: updatedJournal
        })
   } catch (error) {
    return NextResponse.json(
        {
            success: false,
            error
        }
    )
   }
}