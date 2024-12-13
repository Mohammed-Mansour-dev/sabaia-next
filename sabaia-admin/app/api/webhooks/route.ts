import CustomerModal from "@/lib/models/Customer";
import OrderModal from "@/lib/models/Order";
import { connectDB } from "@/lib/MongoDB";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";



export const POST = async (req:NextRequest) =>{
    try {
        const rawBody =await req.text();
const signature =req.headers.get("Stripe-Signature") as string ;

const event =stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
)

if(event.type === "checkout.session.completed"){
    const session = event.data.object 
const customerInfo ={
    clerkId :session?.client_reference_id,
    name:session?.customer_details?.name,
    email:session?.customer_details?.email
}

const shippingAddress = {
    street: session?.shipping_details?.address?.line1,
    city: session?.shipping_details?.address?.city,
    postalCode: session?.shipping_details?.address?.postal_code,
    state: session?.shipping_details?.address?.state,
    country: session?.shipping_details?.address?.country,
  }


const retrieveSession =await stripe.checkout.sessions.retrieve(
    session.id,
    {expand: ["line_items.data.price.product"]}
)

const lineItems =await retrieveSession?.line_items?.data

const orderItems = lineItems?.map((item:any)=>{
    return{
        product: item.price.product.metadata.productId,
        color:item.price.product.metadata.color || "N/A",
        size:item.price.product.metadata.size || "N/A",
        quantity:item.quantity
    }})

    await connectDB();
const Shiping_Ratea =session?.shipping_cost?.shipping_rate

    const newOrder = new  OrderModal({
    customerClerkId: customerInfo.clerkId,
products:orderItems,
shippingAddress:shippingAddress,
totalAmount:session.amount_total ? session.amount_total /100 : 0,
shippingRate:session?.shipping_cost?.shipping_rate,
})

await newOrder.save();
let customer =await CustomerModal.findOne({clerkId:customerInfo.clerkId})

if(customer){
    customer.orders.push(newOrder._id);
   
} else {
    customer = new CustomerModal({
    ...customerInfo,
    orders: [newOrder._id]
    })
 
}

await customer.save();
}


return  new NextResponse("Order Created",{ status:200})
    } catch (error) {
        console.log("[webhooks_POST]",error);
        return new NextResponse("Failed to create the order aa",{status:500})
        
    }
}