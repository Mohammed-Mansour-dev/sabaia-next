
import Stripe from "stripe"


export const stripe = new Stripe(process.env.NEXT_PUBLIC_SECRET_KEY!,{
    apiVersion: '2024-9-30' as Stripe.LatestApiVersion,
     typescript:true
})








