"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "../../store/cart";
import { Fragment } from "react";
import CartList from "./CartList";
import CartPayment from "./CartPayment";

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
                        <CartList cartData={cartItems} />

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
