import Journal from "@/models/journal.model"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest, {params}: {params: {_id: string}}){

   try {
     if(!params._id){
         return NextResponse.json(
             {
                 success: false,
                 error: "Id not recieved"
             },
             {status: 400}
         )
     }
 
     const deletedJournal = await Journal.findByIdAndDelete(params._id)
 
     if(!deletedJournal){
         throw new Error("Journal deletion failed")
     }
 
     console.log(deletedJournal)
 
     return NextResponse.json(
         {
             success: true,
             message: "Journal deleted successfully"
         }
     )
   } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Journal not deleted"
            }
        )
   }

}