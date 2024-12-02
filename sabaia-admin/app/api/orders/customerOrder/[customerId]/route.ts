import OrderModal from "@/lib/models/Order";
import ProductModal from "@/lib/models/Product";
import { connectDB } from "@/lib/MongoDB";
import { NextResponse } from "next/server";



export const GET =async (req:NextResponse,{params}:{params:{customerId:string}})=>{


try {
    
await connectDB();
const {customerId} = await params;

const orders = await OrderModal.find({customerClerkId:customerId})
.populate({path:"products.product",model:ProductModal})

return NextResponse.json(orders,{status:200})
} catch (error) {
    console.log("[customerID_GET]",error);
    return new NextResponse("Internal Server Error", { status: 500 });
}





}







