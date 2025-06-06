import ShopContent from '@/features/shop/components';
import React from 'react';

const Shop = (): JSX.Element => {
    return (
        <section className="shop container !px-6 flex gap-12 mt-[106px]">
            <ShopContent />
        </section>
    );
};

export default Shop;