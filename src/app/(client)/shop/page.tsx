"use client"

import FilterSidebar from '@/features/shop/components/Filter-sidebar';
import ProductCard from '@/features/shop/components/ProductCard';
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from '@/features/shop/services/productServices';
import { Skeleton } from '@/components/ui/skeleton';

const Shop = (): JSX.Element => {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: () => fetchProducts(),
    })

    return (
        <section className="shop container !px-6 flex gap-12 mt-[106px]">
            <FilterSidebar />

            <div className="shop-products w-[calc(100%-380px)] ml-[380px]">
                <header className="shop-products__header">
                    <h2 className='font-michroma text-4xl'>Notre Shop</h2>
                </header>

                <div className="shop-products__showcases grid grid-cols-3 mt-12 gap-x-6 gap-y-8">
                    {/* Skeletons loading */}
                    {
                        isLoading && Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={i} className="w-full h-[240px] rounded-lg" />
                        ))
                    }

                    {/* Rendered products */}
                    {
                        !isLoading && data && data.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Shop;