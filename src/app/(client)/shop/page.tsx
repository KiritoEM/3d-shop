import ShopContent from '@/features/shop/components';
import React from 'react';

const Shop = (): JSX.Element => {
    return (
        <section className="shop mt-[106px]">
            <div className="shop__container container !px-6 flex gap-12">
                <ShopContent />
            </div>
        </section>
    );
};

export default Shop;