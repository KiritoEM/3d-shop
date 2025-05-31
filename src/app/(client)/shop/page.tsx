import FilterSidebar from '@/features/shop/components/Filter-sidebar';
import React from 'react';

const Shop = (): JSX.Element => {
    return (
        <section className="shop container mt-5 !px-6">
            <FilterSidebar />
        </section>
    );
};

export default Shop;