import ProductModal from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";





export const GET = async (req:NextRequest,{params}:{params:{productId:string}}) => {

try {
    
const {productId} =await params;

const product = await ProductModal.findById(productId);

if(!product) {
    return new NextResponse(JSON.stringify({message:"Product not found"}),{status:404})
}

const relatedProducts = await ProductModal.find({
    $or:[
        {category:product.category},
        {collections:{$in:product.collections}},
    ],
    _id:{$ne:product._id},
})

if(!relatedProducts) {
    return new NextResponse(JSON.stringify({message:"relatedProducts not found"}),{status:404})
}
return  NextResponse.json( relatedProducts,{status:200})

} catch (error) {
    console.log("[GET_Related",error);
    return new NextResponse("Internal Server Error", { status: 500 });
}


}












