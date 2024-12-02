import UserModal from "@/lib/models/User";
import { ConnectDB } from "@/lib/MongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";





export const POST = async (req:NextResponse) =>{
    try {
        
const {userId} =await auth();

if(!userId) return new NextResponse("unuthorized",{status:401});

await ConnectDB();


const user =await UserModal.findOne({clerkId : userId});

if(!user){
    return new NextResponse("user not found",{status:404});
}

const {productId} =await req.json();

if(!productId){
    return new NextResponse("product id is required",{status:400});
}

const isLiked = user.wishList.includes(productId);

if(isLiked){
user.wishList = user.wishList.filter((id:string)=> id !== productId);

}else{
user.wishList.push(productId);
}

await user.save();

return NextResponse.json(user ,{status:200});


    } catch (error) {
        console.log(error);
return new NextResponse("internal server error",{status:500})
    }
}






