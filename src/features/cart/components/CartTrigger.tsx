"use client"

import { ShoppingCart } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';
import { useCart } from '../hooks/useCart';

const CartTrigger = (): JSX.Element => {
    const { theme } = useTheme();
    const { setOpenContent } = useCart();
    return (
        <div className="cart-trigger">
            <div className="theme-toggle-trigger cursor-pointer h-14 w-14 flex items-center justify-center rounded-full bg-primary dark:bg-white" onClick={setOpenContent}>
                <ShoppingCart className="size-6" color={theme === "light" ? "#ffffff" : "#E45826"} />
            </div>
        </div>
    );
};

export default CartTrigger;