"use client";

import { FC } from "react";
import { Trash2 } from "lucide-react";
import { formatIntoPrice } from "@/lib/utils";
import { CartItemTypes, useCart } from "../../store/cart";

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

export default CartItem;
