import { connectToDB } from "@/lib/db/mongoDB";
import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/products";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: String } }
) => {
  try {
    await connectToDB();

    const orderDetails = await Order.findById(params.orderId).populate({
      path: "products.product",
      model: Product,
    });


    if (!orderDetails) {
      return new NextResponse( JSON.stringify({ message: "Order not found"}), { status: 400 });
    }

    const customer = await Customer.findOne({ clerkId: orderDetails.customerClerkId})

    return NextResponse.json({orderDetails, customer}, { status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMECRE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Contect-Type"
    }
     });
  } catch (error) {
    console.log("[orderId_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";