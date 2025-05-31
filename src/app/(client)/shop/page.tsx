import FilterSidebar from '@/features/shop/components/Filter-sidebar';
import React from 'react';

const Shop = (): JSX.Element => {
    return (
        <section className="shop container mt-5 !px-6 flex gap-12">
            <FilterSidebar />

            <div className="flex-1 h-[400vh] bg-blue-500"></div>
        </section>
    );
};

export default Shop;