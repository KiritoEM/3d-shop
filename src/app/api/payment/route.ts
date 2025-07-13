import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        if (!data.products || !Array.isArray(data.products)) {
            return NextResponse.json(
                {
                    message: "Products array is required",
                },
                { status: 400 },
            );
        }

        const productPromises = data.products.map(
            async (product: { id: number; image?: string }) => {
                const productFromDB = await prisma.product.findUnique({
                    where: { id: product.id },
                });

                if (!productFromDB) {
                    throw new Error("No product found with id: " + product.id);
                }

                return productFromDB;
            },
        );

        const productsList = await Promise.all(productPromises);

        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            line_items: productsList.map((product) => ({
                price_data: {
                    currency: "eur",
                    unit_amount: product.price.toNumber(),
                    product_data: {
                        name: product.name,
                        description: product.description.split("\n")[0],
                    },
                },
                quantity: 1,
            })),
            mode: "payment",
            payment_method_types: ["card"],
            return_url: `${process.env.NEXTAUTH_URL}/paymentResult?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json({
            id: session.id,
            client_secret: session.client_secret,
        });
    } catch (err) {
        console.error("Payment API Error:", err);

        return NextResponse.json(
            {
                message: "Internal Server Error",
                error:
                    process.env.NODE_ENV === "development"
                        ? String(err)
                        : undefined,
            },
            { status: 500 },
        );
    }
}
