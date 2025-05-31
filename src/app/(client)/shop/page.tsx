import FilterSidebar from '@/features/shop/components/Filter-sidebar';
import React from 'react';

const Shop = (): JSX.Element => {
    return (
        <section className="shop container !px-6 flex gap-12 mt-[106px]">
            <FilterSidebar />

            <div className="w-[calc(100%-380px)] ml-[380px] h-[400vh] bg-blue-500"></div>
        </section>
    );
};

export default Shop;