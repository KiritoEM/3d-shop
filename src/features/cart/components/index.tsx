"use client"

import dynamic from "next/dynamic";
import CartTrigger from "./CartTrigger";

const CartContent = dynamic(() => import("./CartContent"), {
    ssr: false
})

const Cart = (): JSX.Element => {
    return (
        <div className="cart">
            <CartTrigger />
            <CartContent />
        </div>
    );
};

export default Cart;