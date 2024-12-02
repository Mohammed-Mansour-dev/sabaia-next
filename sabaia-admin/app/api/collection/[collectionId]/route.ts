import CollectionModal from "@/lib/models/Collection";
import ProductModal from "@/lib/models/Product";
import { connectDB } from "@/lib/MongoDB";
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"






export const DELETE = async (req: NextRequest,{params}:{params :{collectionId:string}})=>{

try {

const userId = auth();

if(!userId){
    return new NextResponse("Unauthorized",{status:401})
};

await connectDB();
const {collectionId} = await params;

await CollectionModal.findByIdAndDelete(collectionId)
await ProductModal.updateMany({collections:collectionId},{ $pull : {collections :collectionId}})

return new NextResponse("collection deleted",{status:200})
    
} catch (error) {
    console.log("[ERROR_DELETE_Collection]",error)
    return new NextResponse("Internal Server Error c",{status:500})
}

}

export const GET = async (req: NextRequest,{params}:{params :{collectionId:string}})=>{

try {
    
await connectDB();

const  {collectionId} = await params;

const collection = await CollectionModal.findById(collectionId).populate({path:"products", model:ProductModal });

if(!collection){
    return new NextResponse(JSON.stringify({message :"Collection Not Found"}),{status:404})
}



return  NextResponse.json(collection ,{status:200})




} catch (error) {
    console.log("[ERROR_GET_Collection]",error)
    return new NextResponse("Internal Server Error c",{status:500})
}


}


export const POST = async (req: NextRequest,{params}:{params :{collectionId:string}}) =>{

try {
    
await connectDB();

const {collectionId} = await params;

let collection = await CollectionModal.findById(collectionId)

if(!collection){
    return new NextResponse(JSON.stringify({message :"Collection Not Found"}),{status:404})
}



const {title, description, image} = await req.json();

if(!title || !image){
    return new NextResponse(JSON.stringify({message :"Title and Image are Required"}),{status:400})
}


collection = await CollectionModal.findByIdAndUpdate(collectionId ,{title,description,image},{new:true})

await collection.save();

return NextResponse.json(collection, {status:200})

} catch (error) {
    console.log("[ERROR_POST_Collection]",error)
    return new NextResponse("Internal Server Error c",{status:500})
}



}











