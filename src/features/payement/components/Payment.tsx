"use client";

import React, { useCallback } from "react";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DotLoadingScreen from "@/components/DotLoadingScreen";
import BackButton from "@/components/BackButton";
import { fetchSecret } from "../services/paymentServices";
import { usePayment } from "../hooks/usePayment";

const PaymentContent = (): JSX.Element => {
    const { productsToBuy, _hasHydrated } = usePayment();
    const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    );

    const fetchClientSecret = useCallback(async (): Promise<string> => {
        return await fetchSecret(productsToBuy);
    }, [productsToBuy]);

    if (!_hasHydrated) {
        return <DotLoadingScreen text="Chargement en cours..." />;
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
