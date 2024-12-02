import CustomerModal from "@/lib/models/Customer";
import { connectDB } from "@/lib/MongoDB";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (req:NextRequest)=>{


try {
    
await connectDB();

const customers = await CustomerModal.find().sort({createdAt:"desc"});

return NextResponse.json(customers,{status:200})

} catch (error) {
    console.log("[GET_customers] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
}


}












