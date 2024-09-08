import { connectToDB } from "@/lib/db/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/products";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "next-cloudinary"

// cloudinary.config({ 
//   cloud_name: 'xx', 
//   api_key: 'xx', 
//   api_secret: 'xx' 
// });

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  console.log(params.productId);

  try {
   
    await connectToDB();
    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[ProductId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }
    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 400 }
      );
    }
    const {
      title,
      sizes,
      colors,
      tags,
      media,
      collections,
      category,
      discription,
      pay,
      price,
      brand,
    } = await req.json();

    if (
      !title ||
      !sizes ||
      !collections ||
      !colors ||
      !tags ||
      !media ||
      !category ||
      !discription ||
      !pay ||
      !price ||
      !brand
    ) {
      return new NextResponse("Fill all fields", { status: 400 });
    }

    //included in new data, but not included in the previous data

    const addCollectionId = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );

    //included in prevous data , but not included in the new data
    const removerCollectionId = collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );

    // update added collection with this product
    await Promise.all([
      ...addCollectionId.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),

      //update removed cillections without this product
      ...removerCollectionId.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    // update product

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        sizes,
        colors,
        tags,
        media,
        collections,
        category,
        discription,
        pay,
        price,
        brand,
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log("[ProductId_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req:NextRequest, { params }: { params: { productId: string } }) => {

  try {
    await connectToDB();

    // cloudinary.config({
    //   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    //   api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    //   api_secret:process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
    // }) 

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(product._id);

    //  await product?.media.map((image: string) => {
    //   const url =`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy `
    //   const imageUrl = image.split('/')
    //   const imageName = imageUrl[imageUrl.length-1].split('.')[0]
      
    //   cloudinary.CldUploadWidget.destroy(imageName, function(result) { console.log(result) });
      
    // });



    // update collections

    await Promise.all(
      product.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      )
    );

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[ProductId_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
