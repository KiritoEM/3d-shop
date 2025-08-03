"use client";

import { FC } from "react";
import { WalletCards } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/features/payement/hooks/usePayment";
import DotLoadingScreen from "@/components/DotLoadingScreen";
import { CartItemTypes } from "../../store/cart";

type CartPaymentProps = {
    totalPrice: number;
    productsToBuy: CartItemTypes[];
    closeContent: () => void;
};

const CartPayment: FC<CartPaymentProps> = ({
    totalPrice,
    productsToBuy,
    closeContent,
}): JSX.Element => {
    const router = useRouter();
    const { setProductsToBuy } = usePayment();
    const { status, data } = useSession();

    const handlePay = () => {
        if (status === "loading") return <DotLoadingScreen />;

        setProductsToBuy(productsToBuy);

        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=payment");
            return;
        }

        router.push("/payment");
        closeContent();
    };

    return (
        <div className="cart-paiement bg-background mt-8 w-full pb-8">
            <div className="cart-paiement__container flex items-center justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <p className="text-primary font-michroma mr-1 text-lg">
                        total:
                    </p>
                    <h5 className="text-xl">{totalPrice} €</h5>
                </div>

                <Button className="rounded-full" onClick={handlePay}>
                    <WalletCards /> Payer
                </Button>
            </div>
        </div>
    );
};

export default CartPayment;
