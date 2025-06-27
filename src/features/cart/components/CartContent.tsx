"use client"

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
        <article className="cart-item flex justify-between gap-6 lg:gap-8 items-center">
            <div className="cart-item__content space-y-1 w-fit ml-4">
                <h5 className="text-md md:text-lg font-michroma leading-none">{name}</h5>
                <p className="text-sm md:text-base">{formatIntoPrice(price)} €</p>
            </div>

            <div className="delete-item cursor-pointer hover:[&>svg]:scale-105" onClick={() => deleteItem(id)}>
                <Trash2 className="text-destructive size-6" />
            </div>
        </article>
    )
}

type CartItemsListProps = {
    cartData: CartItemTypes[]
}

const CartItemsList: FC<CartItemsListProps> = ({ cartData }): JSX.Element => {
    return (
        <div className="cart-items-list flex flex-col space-y-6 mt-8">
            {
                cartData.map((item, index) => (
                    <CartItem key={index} {...item} />
                ))
            }
        </div>
    )
}

type CartPaymentProps = {
    totalPrice: number;
    productsToBuy: CartItemTypes[];
    closeContent: () => void
}

const CartPayment: FC<CartPaymentProps> = ({ totalPrice, productsToBuy, closeContent }): JSX.Element => {
    const router = useRouter();
    const { setProductsToBuy } = usePayment();
    const { status, data } = useSession();

    const handlePay = () => {
        if (status === "loading") return <AuthLoadingScreen />

        setProductsToBuy(productsToBuy);

        if (status === "unauthenticated") {
            router.push("/login?callbackUrl=payment");
            return;
        }

        router.push("/payment");
        closeContent();
    }

    return (
        <div className="w-full cart-paiement mt-8 pb-8 bg-background">
            <div className="cart-paiement__container flex items-center justify-between gap-6">
                <div className="flex flex-col gap-1">
                    <p className="text-primary text-lg mr-1 font-michroma">total:</p>
                    <h5 className="text-xl">{totalPrice} €</h5>
                </div>

                <Button className="rounded-full" onClick={handlePay}><WalletCards /> Payer</Button>
            </div>
        </div>
    )
}

const CartContent = (): JSX.Element => {
    const { isOpenContent, setCloseContent, cartItems, getTotalPrice } = useCart();
    return (
        <Fragment>
            <div className={
                cn(
                    "cart-content shadow-2xl fixed z-50 top-0 right-0 px-8 w-full max-w-[380px] md:max-w-[400px] lg:max-w-[393px] 2xl:max-w-[400px] h-screen bg-background overflow-y-auto scrollable-section transition-all duration-300 ease-out",
                    isOpenContent ? "translate-x-0" : "translate-x-[100%]"
                )
            }>
                {/* Close icon */}
                <div className="close-btn p-2 cursor-pointer rounded-lg border border-input w-fit absolute top-5 left-5" onClick={setCloseContent} title="Fermer le panier">
                    <X className="size-5" />
                </div>

                <h4 className="text-2xl md:text-3xl font-michroma mt-22">Votre panier</h4>

                {
                    cartItems.length ? (
                        <Fragment>
                            <CartItemsList cartData={cartItems} />

                            <hr className="mt-8" />

                            <CartPayment totalPrice={getTotalPrice()} closeContent={setCloseContent} productsToBuy={cartItems} />
                        </Fragment>
                    ) : (
                        <h4 className="empty-cart text-lg lg:text-xl w-full col-span-3 mt-8">Votre panier est vide</h4>
                    )
                }
            </div>

            {/* Overlay */}
            {
                isOpenContent && (
                    <div className="cart-overlay fixed z-40 top-0 left-0 w-screen h-screen bg-white/40 backdrop-blur-xs" onClick={() => setCloseContent()} />
                )
            }
        </Fragment>
    );
};

export default CartContent;