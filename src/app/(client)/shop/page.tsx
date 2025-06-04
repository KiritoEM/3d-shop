"use client"

import ProductCard from "@/features/shop/components/ProductCard";
import React, { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useShopData from "@/hooks/shop/useShopData";
import SearchInput from "@/components/SearchInput";
import dynamic from "next/dynamic";

const FilterSidebar = dynamic(() => import("@/features/shop/components/Filter-sidebar"), {
    ssr: false
})

const Shop = (): JSX.Element => {
    const { categories,
        filteredProducts,
        productsLoading,
        handleChangePriceRange,
        priceRange,
        handleSearchChange,
        handleChangeFilters
    } = useShopData();
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <section className="shop container !px-6 flex gap-12 mt-[106px]">
            <FilterSidebar
                categories={categories ?? []}
                priceRange={priceRange!}
                setPriceRange={handleChangePriceRange}
                setFilters={handleChangeFilters}
            />

            <div className="shop-products w-full lg:w-[calc(100%-355px)] xl:w-[calc(100%-370px)] ml-0 lg:ml-[355px] xl:ml-[370px] mb-20 mt-7">
                <header className="shop-products__header w-full flex items-center justify-between overflow-hidden">
                    <h2 className='font-michroma text-3xl xl:text-4xl'>Notre Shop</h2>

                    <SearchInput ref={inputRef} handleChange={handleSearchChange} />
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
                        !productsLoading && filteredProducts.length === 0 && (
                            <h4 className="text-2xl w-full col-span-3">Pas de produits correspondants</h4>
                        )
                    }

                    {/* Rendered products */}
                    {
                        filteredProducts && filteredProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Shop;