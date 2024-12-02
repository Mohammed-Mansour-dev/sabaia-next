import CustomerModal from "@/lib/models/Customer";
import OrderModal from "@/lib/models/Order";
import ProductModal from "@/lib/models/Product";
import { connectDB } from "@/lib/MongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest,{params}:{params:{orderId:string}})=>{


try {

    await connectDB();

    const { orderId } = await params;

    const orderDetails = await OrderModal.findById(orderId).populate({
        path:"products.product",
        model:ProductModal
    });

    if(!orderDetails){
        return new NextResponse(JSON.stringify({message :"Order Not Found"}),{status:404})
    }

const customer = await CustomerModal.findOne({clerkId:orderDetails.customerClerkId});

return  NextResponse.json({orderDetails,customer},{status:200})

    
} catch (error) {
    console.log("[OrderId_Get] Error",error);
    return new NextResponse("Internal Server Error",{status:500})
}

}