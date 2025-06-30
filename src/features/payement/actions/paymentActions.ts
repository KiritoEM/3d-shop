"use server";

import { IResponseType } from "@/types";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export const addPayment = async (
    session: Stripe.Response<Stripe.Checkout.Session>,
    userId: string,
): Promise<IResponseType<any>> => {
    try {
        const existingPayment = await prisma.transaction.findUnique({
            where: { stripeChargeId: session.id },
        });

        if (existingPayment) {
            return {
                status: "error",
                message: "Cette transaction existe déjà",
            };
        }

        const createdPayment = await prisma.transaction.create({
            data: {
                amount: session.amount_total!,
                customerEmail: session.customer_details?.email!,
                customerName: session.customer_details?.name!,
                status: "SUCCEEDED",
                stripeChargeId: session.id!,
                currency: "eur",
                user: {
                    connect: {
                        id: userId,
                    },
                },
                stripePaymentIntentId: session.payment_intent as string,
            },
        });

        if (!createdPayment) {
            return {
                status: "error",
                message: "Un erreur s'est produit lors du paiement",
            };
        }

        return {
            status: "success",
            message: "Transaction enregistrée avec succès",
            data: createdPayment,
        };
    } catch (err) {
        console.error(err);
        return {
            status: "error",
            message: "Un erreur s'est produit",
        };
    }
};
