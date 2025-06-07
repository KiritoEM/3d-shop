"use client"

import React, { useCallback, useEffect, useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { usePayment } from "../hooks/usePayment";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const PaymentContent = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const { productsToBuy, _hasHydrated } = usePayment();
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

    useEffect(() => {
        if (_hasHydrated) {
            setIsLoading(false);
        }
    }, [_hasHydrated])

    const fetchClientSecret = useCallback(async () => {
        try {
            if (!productsToBuy || productsToBuy.length === 0) {
                throw new Error("No products to buy");
            }

            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    products: productsToBuy.map((product) => {
                        return {
                            id: product.id, image: product.preview3D
                        }
                    })
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.client_secret;
        } catch (err) {
            console.error("Error fetching client secret:", err);
            throw err;
        }
    }, [productsToBuy]);

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="flex flex-col gap-3 items-center">
                    <div className="spinner mx-auto mt-4 animate-spin rounded-full h-8 w-7 border-b-2 border-primary" />
                    <p className="font-michroma text-lg">Chargement en cours...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="payment-content w-full bg-white pt-30 pb-12">
            {/* Back icon */}
            <div className="back-btn w-fit h-fit absolute cursor-pointer text-black top-10 left-10 flex items-center gap-4" onClick={() => router.back()}>
                <ArrowLeft className="cursor-pointer size-6" />
                <p>Retour</p>
            </div>

            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret }}
            >
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    );
};

export default PaymentContent;