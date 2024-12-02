import UserModal from "@/lib/models/User";
import { ConnectDB } from "@/lib/MongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";




export const GET = async (req :NextRequest) =>{
    try {

const {userId} =await auth();

if(!userId) {
    return new NextResponse(JSON.stringify({message:"unauthorized"})),{status:401}
}

await ConnectDB();


let user = await UserModal.findOne({clerkId :userId});

if(!user){
    user =await UserModal.create({clerkId:userId});
    await user.save();
}
return NextResponse.json(user , {status:200})
    } catch (error) {
        console.log(error);
        return new NextResponse("internal server error",{status:500})
    }
}

