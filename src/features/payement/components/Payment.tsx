"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { usePayment } from "../hooks/usePayment";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fetchSecret } from "../services/paymentServices";

const BackButton = () => {
    const router = useRouter();
    return (
        <div
            className="back-btn absolute left-10 top-10 flex h-fit w-fit cursor-pointer items-center gap-4 text-black"
            onClick={() => router.back()}
        >
            <ArrowLeft className="size-6 cursor-pointer" />
            <p>Retour</p>
        </div>
    );
};

const LoadingScreen = () => (
    <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
            <div className="spinner border-primary mx-auto mt-4 h-8 w-7 animate-spin rounded-full border-b-2" />
            <p className="font-michroma text-lg">Chargement en cours...</p>
        </div>
    </div>
);

const PaymentContent = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { productsToBuy, _hasHydrated } = usePayment();
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    );

    useEffect(() => {
        if (_hasHydrated) {
            setIsLoading(false);
        }
    }, [_hasHydrated]);

    const fetchClientSecret = useCallback(async (): Promise<string> => {
        return await fetchSecret(productsToBuy);
    }, [productsToBuy]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="payment-content pt-30 w-full bg-white pb-12">
            <BackButton />

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
