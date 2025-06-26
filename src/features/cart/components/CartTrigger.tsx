"use client"

import { ShoppingCart } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';
import { useCart } from '../hooks/useCart';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const CartTrigger = (): JSX.Element => {
    const { theme } = useTheme();
    const { setOpenContent, cartNotification, removeNotification } = useCart();
    const path = usePathname();

    const isVisible = path.split("/").includes("shop");
    return (
        <div className={
            cn(
                "cart-trigger",
                isVisible ? "block" : "hidden"
            )
        }>
            <div
                className="theme-toggle-trigger relative cursor-pointer h-12 lg:h-14 w-12 lg:w-14 flex items-center justify-center rounded-full bg-primary dark:bg-white"
                onClick={() => { setOpenContent(), cartNotification?.status === "add" && removeNotification() }}
            >
                <ShoppingCart className="size-5 lg:size-6" color={theme === "light" ? "#ffffff" : "#E45826"} />

                {
                    cartNotification?.status === "add" && (
                        <span className="absolute top-0 right-1 flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        </span>
                    )
                }
            </div>
        </div>
    );
};

export default CartTrigger;