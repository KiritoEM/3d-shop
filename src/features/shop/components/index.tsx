"use client";

import React, { Fragment, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { FilterIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/features/shop/components/ProductCard";
import useShopData from "@/features/shop/hooks/shop/useShopData";
import SearchInput from "@/components/SearchInput";
import ProductSkeleton from "./skeletons/ProductSkeleton";
import FilterbarSkeleton from "./skeletons/FilterbarSkeleton";

//lazy loading
const FilterSidebar = dynamic(
    () => import("@/features/shop/components/Filter-sidebar/FilterSidebar"),
    {
        ssr: false,
        loading: () => <FilterbarSkeleton />,
    },
);

const FilterSidebarMobile = dynamic(
    () => import("@/features/shop/components/Filter-sidebar/SidebarMobile"),
    {
        ssr: false,
    },
);

const ShopContent = (): JSX.Element => {
    const [isSidebarOpen, setOpenSidebar] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
        products,
        categories,
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
                {/* Sidebar - desktop and more */}
                <FilterSidebar
                    categories={categories ?? []}
                    priceRange={priceRange!}
                    categoriesLoading={categoriesLoading}
                    setPriceRange={handleChangePriceRange}
                />

                {/* Sidebar - mobile and tablet */}
                <FilterSidebarMobile
                    categories={categories ?? []}
                    priceRange={priceRange!}
                    isSidebarOpen={isSidebarOpen}
                    closeSidebar={() => setOpenSidebar(false)}
                    categoriesLoading={categoriesLoading}
                    setPriceRange={handleChangePriceRange}
                />
            </Fragment>

            <div className="shop-products mb-20 ml-0 mt-5 w-full md:mt-7 lg:ml-[355px] lg:w-[calc(100%-355px)] xl:ml-[370px] xl:w-[calc(100%-370px)]">
                <header className="header flex items-center justify-between gap-6 overflow-hidden">
                    <h2 className="header__title font-michroma text-2xl md:text-3xl xl:text-4xl">
                        Notre Shop
                    </h2>

                    {/* Section Header */}
                    <div className="header__actions flex space-x-3">
                        <div
                            className="filter-btn bg-input flex h-9 items-center rounded-lg px-3 lg:hidden"
                            onClick={() => setOpenSidebar(true)}
                        >
                            akf
                            <FilterIcon className="size-4" />
                        </div>

                        <SearchInput
                            ref={inputRef}
                            handleChange={handleSearchChange}
                        />
                    </div>
                </header>

                {/* Product Content */}
                <div className="shop-products__content sm2:grid-cols-2 mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-3 xl:mt-12 2xl:grid-cols-4">
                    {productsLoading ? (
                        // Skeletons loading
                        <ProductSkeleton />
                    ) : productsError ? (
                        // Error state
                        <h4 className="col-span-3 w-full text-xl xl:text-2xl">
                            Une erreur s'est produite
                        </h4>
                    ) : products && products.length > 0 ? (
                        // Products display
                        products.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    ) : (
                        // No products found
                        <h4 className="col-span-3 w-full text-xl">
                            Pas de produits correspondants
                        </h4>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ShopContent;
