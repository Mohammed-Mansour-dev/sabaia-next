import CollectionModal from "@/lib/models/Collection";
import { connectDB } from "@/lib/MongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



// upload Collections to Mongo
export const POST = async (req: NextRequest)=>{

try {
// check if the user is authenticated
const userId =auth();
if(!userId){
    return new NextResponse("Unauthorized", {status:403})
}

// connect to the database
await connectDB()

// check if collection exists
const {title, description , image} =await req.json();
const isExistingCollec = await CollectionModal.findOne({title:title});

if(isExistingCollec){
    return new NextResponse("Collection already exists", {status:400})
}

// check image and title not empty
if(!title || !image){
    return new NextResponse("Title and image are required", {status:400});
}

// create a new collection
const newCollection = await CollectionModal.create({
    title,
    description,
    image,
 
})
await newCollection.save(); 
return NextResponse.json(newCollection ,{status:200});
} catch (error) {
    console.log("[collections_Post] ",error);
    return new NextResponse("Internal Server Error" ,{status:500})
}


}

//  Get all collections from mongoose
export const GET = async (req: NextRequest)=>{

try {
    
await connectDB();

const collections = await CollectionModal.find().sort({createdAt:"desc"});


return NextResponse.json(collections ,{status:200}) 


} catch (error) {
    console.log("[collections_Get] ",error);
    return new NextResponse("Internal Server Error get collections" ,{status:500})
}



}

