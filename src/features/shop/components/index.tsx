"use client"

import ProductCard from "@/features/shop/components/ProductCard";
import React, { Fragment, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useShopData from "@/features/shop/hooks/shop/useShopData";
import SearchInput from "@/components/SearchInput";
import dynamic from "next/dynamic";
import { FilterIcon } from "lucide-react";

const FilterbarLoaderSkeletons = () => (
    <aside className="filter-bar-skeletons hidden lg:block w-full max-w-[310px] xl:max-w-[325px] space-y-8 h-[calc(100vh-110px)] pb-8 fixed">
        <Skeleton className="customisation-card rounded-lg w-full h-[140px]" />
        <Skeleton className="category-card rounded-lg w-full h-[340px]" />
        <Skeleton className="price-card rounded-lg w-full h-[100px]" />
    </aside>
)

const FilterSidebar = dynamic(() => import("@/features/shop/components/Filter-sidebar"), {
    ssr: false,
    loading: () => <FilterbarLoaderSkeletons />
})

const FilterSidebarMobile = dynamic(() => import("@/features/shop/components/Filter-sidebar/SidebarMobile"), {
    ssr: false
})


const ShopContent = (): JSX.Element => {
    const [isSidebarOpen, setOpenSidebar] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
        categories,
        isProductsLoaded,
        filteredProducts,
        productsError,
        productsLoading,
        categoriesLoading,
        priceRange,
        handleChangePriceRange,
        handleSearchChange,
    } = useShopData();

    return (
        <Fragment>
            <Fragment>
                <FilterSidebar
                    categories={categories ?? []}
                    priceRange={priceRange!}
                    categoriesLoading={categoriesLoading}
                    setPriceRange={handleChangePriceRange}
                />

                {/* Sidebar for mobile and tablet */}
                <FilterSidebarMobile
                    categories={categories ?? []}
                    priceRange={priceRange!}
                    isSidebarOpen={isSidebarOpen}
                    closeSidebar={() => setOpenSidebar(false)}
                    categoriesLoading={categoriesLoading}
                    setPriceRange={handleChangePriceRange}
                />
            </Fragment>

            <div className="shop-products w-full lg:w-[calc(100%-355px)] xl:w-[calc(100%-370px)] ml-0 lg:ml-[355px] xl:ml-[370px] mb-20 mt-5 md:mt-7">
                <header className="header flex items-center justify-between gap-6 overflow-hidden">
                    <h2 className="header__title font-michroma text-2xl md:text-3xl xl:text-4xl">Notre Shop</h2>

                    <div className="header__actions flex space-x-3">
                        <div className="filter-btn rounded-lg px-3 h-9 flex lg:hidden items-center bg-input" onClick={() => setOpenSidebar(true)}>
                            <FilterIcon className="size-4" />
                        </div>

                        <SearchInput ref={inputRef} handleChange={handleSearchChange} />
                    </div>
                </header>

                <div className="shop-products__showcases grid sm2:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 mt-10 xl:mt-12 gap-x-6 gap-y-8">
                    {/* Rendered products */}
                    {
                        filteredProducts && filteredProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    }

                    {/* Skeletons loading */}
                    {
                        productsLoading && Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="w-full h-[228px] lg:h-[200px] xl:h-[260px] 2xl:h-[235px] rounded-lg" />
                        ))
                    }

                    {/* If an error occured */}
                    {
                        productsError && (
                            <h4 className="text-xl xl:text-2xl w-full col-span-3">Un erreur s'est produit</h4>
                        )
                    }

                    {/* If no items in shop */}
                    {
                        !productsLoading && isProductsLoaded && (filteredProducts.length === 0 || productsError) && (
                            <h4 className="text-xl xl:text-2xl w-full col-span-3">Pas de produits correspondants</h4>
                        )
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default ShopContent;