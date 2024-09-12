import { connectToDB } from "@/lib/db/mongoDB";
import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import { NextResponse } from "next/server";
import {format} from "date-fns"

export const GET = async()=>{
    try {
        await connectToDB();

        const orders = await Order.find().sort({createdAt: "desc"})

        const orderDetails = await Promise.all(orders.map( async(order)=>{
            const customer = await Customer.findOne({clerkId: order.customerClerkId});
            return {
                _id: order._id,
                customer: customer.name,
                products: order.products.length,
                totalAmount: order.totalAmount,
                createdAt: format(order.createdAt, "MMM do, yyy")  // add date-fns
            }
        }))

        return NextResponse.json(orderDetails, {status: 200})
    } catch (error) {
        console.log("[orders_GET]", error);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}