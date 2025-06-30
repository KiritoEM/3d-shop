import ShopContent from "@/features/shop/components";
import React from "react";

const Shop = (): JSX.Element => {
    return (
        <section className="shop mt-[106px]">
            <div className="shop__container container flex gap-12 !px-6">
                <ShopContent />
            </div>
        </section>
    );
};

export default Shop;
