"use client"

import dynamic from "next/dynamic";

const ShopContent = dynamic(() => import("@/features/shop/components/ShopContent"), {
    ssr: false
})

const Shop = (): JSX.Element => {

    return <ShopContent />
};

export default Shop;