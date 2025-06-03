"use client"

import FilterSidebar from '@/features/shop/components/Filter-sidebar';
import ProductCard from '@/features/shop/components/ProductCard';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import useShopData from '@/hooks/shop/useShopData';

const Shop = (): JSX.Element => {
    const { categories, filteredProducts, productsLoading, productsError, handleChangeCategory, activeCategory } = useShopData();

    return (
        <section className="shop container !px-6 flex gap-12 mt-[106px]">
            <FilterSidebar categories={categories ?? []} activeCategory={activeCategory} setCategory={handleChangeCategory} />

            <div className="shop-products w-full lg:w-[calc(100%-355px)] xl:w-[calc(100%-370px)] ml-0 lg:ml-[355px] xl:ml-[370px] mb-20 mt-7">
                <header className="shop-products__header">
                    <h2 className='font-michroma text-3xl xl:text-4xl'>Notre Shop</h2>
                </header>

                <div className="shop-products__showcases grid sm2:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 mt-10 xl:mt-12 gap-x-6 gap-y-8">
                    {/* Skeletons loading */}
                    {
                        productsLoading && Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="w-full h-[228px] lg:h-[200px] xl:h-[260px] 2xl:h-[235px] rounded-lg" />
                        ))
                    }

                    {/* If no items in shop */}
                    {
                        !productsLoading && (!filteredProducts || productsError) && (
                            <h4 className="text-2xl w-full col-span-3">Pas de produits disponibles</h4>
                        )
                    }

                    {/* Rendered products */}
                    {
                        !productsLoading && filteredProducts && filteredProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Shop;