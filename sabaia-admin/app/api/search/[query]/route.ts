import ProductModal from "@/lib/models/Product";
import { NextRequest, NextResponse } from "next/server";





export const GET = async (req:NextRequest,{params}:{params:{query:string}})=>{
try {
  const {query} = await params;

const searchProducts = await ProductModal.find({
    $or:[
        {title:{$regex:query, $options:"i"}},
        {category:{$regex:query, $options:"i"}},
        {tags:{$in:[new RegExp(query,"i")]}},
    ]
})

  return NextResponse.json(searchProducts,{status:200})
} catch (error) {
    console.log("[get_search]",error)
     return new NextResponse("Internal Server Error",{status:500})
}




}






