import  CollectionModal  from '@/lib/models/Collection';
import ProductModal from "@/lib/models/Product";
import { connectDB } from "@/lib/MongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const {
      title,
      description,
      media,
      tags,
      collections,
      price,
      expense,
      colors,
      sizes,
      category,
    } = await req.json();

    if (!title || !description || !media || !price || !expense || !category) {
      return new NextResponse("Data not enough to create product", {
        status: 400,
      });
    }

    const newProduct = await ProductModal.create({
      title,
      description,
      media,
      tags,
      collections,
      price,
      expense,
      colors,
      sizes,
      category,
    });
    await newProduct.save();

if(collections){
  for (const collectionId of collections){
const collection = await CollectionModal.findById(collectionId);
if(collection){
  collection.products.push(newProduct._id);
  await collection.save();
}

  }
}


    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log(["creatd-prod"], error);
    return new NextResponse("internal error", { status: 500 });
  }
};








export const GET = async (req :NextRequest) => {

try {

await connectDB()

const products = await ProductModal.find().sort({ createdAt: "desc" }).populate({path :"collections",model :CollectionModal});

return NextResponse.json(products, { status: 200 })


    
} catch (error) {
    console.log(["creatd-prod"], error);
    return new NextResponse("internal error prodget", { status: 500 });
}


}








