"use client";

import { cn, formatIntoPrice } from "@/lib/utils";
import { CartItemTypes, useCart } from "../hooks/useCart";
import { FC, Fragment } from "react";
import { Trash2, WalletCards, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePayment } from "@/features/payement/hooks/usePayment";
import { useSession } from "next-auth/react";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";

const CartItem: FC<CartItemTypes> = ({ id, name, price }): JSX.Element => {
    const { deleteItem } = useCart();
    return (
        <article className="cart-item flex items-center justify-between gap-6 lg:gap-8">
            <div className="cart-item__content ml-4 w-fit space-y-1">
                <h5 className="text-md font-michroma leading-none md:text-lg">
                    {name}
                </h5>
                <p className="text-sm md:text-base">
                    {formatIntoPrice(price)} €
                </p>
            </div>

            <div
                className="delete-item cursor-pointer hover:[&>svg]:scale-105"
                onClick={() => deleteItem(id)}
            >
                <Trash2 className="text-destructive size-6" />
            </div>
        </article>
    );
};

type CartItemsListProps = {
    cartData: CartItemTypes[];
};

const CartItemsList: FC<CartItemsListProps> = ({ cartData }): JSX.Element => {
    return (
        <div className="cart-items-list mt-8 flex flex-col space-y-6">
            {cartData.map((item, index) => (
                <CartItem key={index} {...item} />
            ))}
        </div>
    );
};

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
        if (status === "loading") return <AuthLoadingScreen />;

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

const CartContent = (): JSX.Element => {
    const { isOpenContent, setCloseContent, cartItems, getTotalPrice } =
        useCart();
    return (
        <Fragment>
            <div
                className={cn(
                    "cart-content bg-background scrollable-section fixed right-0 top-0 z-50 h-screen w-full max-w-[380px] overflow-y-auto px-8 shadow-2xl transition-all duration-300 ease-out md:max-w-[400px] lg:max-w-[393px] 2xl:max-w-[400px]",
                    isOpenContent ? "translate-x-0" : "translate-x-[100%]",
                )}
            >
                {/* Close icon */}
                <div
                    className="close-btn border-input absolute left-5 top-5 w-fit cursor-pointer rounded-lg border p-2"
                    onClick={setCloseContent}
                    title="Fermer le panier"
                >
                    <X className="size-5" />
                </div>

                <h4 className="font-michroma mt-22 text-2xl md:text-3xl">
                    Votre panier
                </h4>

                {cartItems.length ? (
                    <Fragment>
                        <CartItemsList cartData={cartItems} />

                        <hr className="mt-8" />

                        <CartPayment
                            totalPrice={getTotalPrice()}
                            closeContent={setCloseContent}
                            productsToBuy={cartItems}
                        />
                    </Fragment>
                ) : (
                    <h4 className="empty-cart col-span-3 mt-8 w-full text-lg lg:text-xl">
                        Votre panier est vide
                    </h4>
                )}
            </div>

            {/* Overlay */}
            {isOpenContent && (
                <div
                    className="cart-overlay backdrop-blur-xs fixed left-0 top-0 z-40 h-screen w-screen bg-white/40"
                    onClick={() => setCloseContent()}
                />
            )}
        </Fragment>
    );
};

export default CartContent;
