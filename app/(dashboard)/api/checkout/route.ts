import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe'

export const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIP_SECRET_KEY}`, {
    typescript: true
});

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Method": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Contect-type, Authorization"
}

export async function OPTIONS() {
    return NextResponse.json({}, {headers: corsHeaders})
}

export async function POST(req: NextRequest) {
    try {
        const { cartItems, customer} = await req.json();

        if(!cartItems || !customer){
            return new NextResponse("Not enough data to checkout", {status: 400})
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            shipping_address_collection: {
                allowed_countries: ["ID"]
            },
            shipping_options:[]
        })
    } catch (error) {
        console.log("[checkout_POST]", error);
        return new NextResponse('Internal Server Error', {status: 500})
    }
}