import CollectionModal from "@/lib/models/Collection";
import ProductModal from "@/lib/models/Product";
import { connectDB } from "@/lib/MongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectDB();

    const { productId } = params;

const product = await ProductModal.findById(productId);

if(!product){
    return new NextResponse(JSON.stringify({message: "Product not found"}),{status:404})
   
}


    await ProductModal.findByIdAndDelete(product._id);


// delete pro collec from collec

await Promise.all(
    product.collections.map( (collectionId:string) => 
       CollectionModal.findByIdAndUpdate(
        collectionId,
        { $pull: { products: product._id } }
      )
    )
  );




    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("[internal server error] Delete prod ", {
      status: 500,
    });
  }
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectDB();

    const { productId } = await params;

    const product = await ProductModal.findById(productId).populate({
      path: "collections",
      model: CollectionModal,
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(product, { status: 200 , headers: {
      "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    }});
  } catch (error) {
    console.log(error);
    return new NextResponse("[internal server error] Get all products ", {
      status: 500,
    });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const userId = auth();
    const { productId } = await params;

    // check user
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    // getting the product
    const product = await ProductModal.findById(productId);
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // get & check coming data
    const {
      title,
      description,
      media,
      price,
      expense,
      collections,
      tags,
      category,
      sizes,
      colors,
    } = await req.json();
    if (!title || !description || !media || !price || !expense || !category) {
      return new NextResponse("Please fill all fields", { status: 400 });
    }

    // check added collections to product
    const addedCollections = collections.filter(
      (colId: string) => !product.collections.includes(colId)
    );

    // check removed collections from product
    const removedCollections = product.collections.filter(
      (colId: string) => !collections.includes(colId)
    );

    await Promise.all([
      ...addedCollections.map((colId: string) =>
        CollectionModal.findByIdAndUpdate(colId, {
          $push: { products: product._id },
        })
      ),
      ...removedCollections.map((colId: string) =>
        CollectionModal.findByIdAndUpdate(colId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    const updatedProduct = await ProductModal.findByIdAndUpdate(product._id, {
      title,
      description,
      media,
      price,
      expense,
      collections,
      tags,
      category,
      sizes,
      colors,
    },{new :true}).populate({path:"collections",model:CollectionModal});

await updatedProduct.save();

return NextResponse.json(updatedProduct ,{status:200})

  } catch (error) {
    console.log("[productId_Post", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
