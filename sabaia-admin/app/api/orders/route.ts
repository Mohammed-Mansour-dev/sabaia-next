import CustomerModal from "@/lib/models/Customer";
import OrderModal from "@/lib/models/Order";
import { connectDB } from "@/lib/MongoDB";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns";


export const GET =async (req :NextRequest)=>{
    try {
        
        await connectDB()

        const orders =await OrderModal.find().sort({createdAt:"desc"})

        const orderDetails =await Promise.all(orders.map(async (order)=>{
const customer = await CustomerModal.findOne({clerkId: order.customerClerkId})

return{

    _id:order._id,
    customer:customer.name,
    products:order.products.length,
    totalAmount:order.totalAmount,
    createdAt:format(order.createdAt,"MMM do, yyyy")

}

}))

return NextResponse.json(orderDetails, {status:200})

    } catch (error) {
        console.log("[orders_request]", error);
        return new NextResponse("Internal Server Error",{})
    }
}








