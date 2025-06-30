"use client";

import ProductCard from "@/features/shop/components/ProductCard";
import React, { Fragment, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useShopData from "@/features/shop/hooks/shop/useShopData";
import SearchInput from "@/components/SearchInput";
import dynamic from "next/dynamic";
import { FilterIcon } from "lucide-react";

const FilterbarLoaderSkeletons = () => (
    <aside className="filter-bar-skeletons fixed hidden h-[calc(100vh-110px)] w-full max-w-[310px] space-y-8 pb-8 lg:block xl:max-w-[325px]">
        <Skeleton className="customisation-card h-[140px] w-full rounded-lg" />
        <Skeleton className="category-card h-[340px] w-full rounded-lg" />
        <Skeleton className="price-card h-[100px] w-full rounded-lg" />
    </aside>
);

const FilterSidebar = dynamic(
    () => import("@/features/shop/components/Filter-sidebar"),
    {
        ssr: false,
        loading: () => <FilterbarLoaderSkeletons />,
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

            <div className="shop-products mb-20 ml-0 mt-5 w-full md:mt-7 lg:ml-[355px] lg:w-[calc(100%-355px)] xl:ml-[370px] xl:w-[calc(100%-370px)]">
                <header className="header flex items-center justify-between gap-6 overflow-hidden">
                    <h2 className="header__title font-michroma text-2xl md:text-3xl xl:text-4xl">
                        Notre Shop
                    </h2>

                    <div className="header__actions flex space-x-3">
                        <div
                            className="filter-btn bg-input flex h-9 items-center rounded-lg px-3 lg:hidden"
                            onClick={() => setOpenSidebar(true)}
                        >
                            <FilterIcon className="size-4" />
                        </div>

                        <SearchInput
                            ref={inputRef}
                            handleChange={handleSearchChange}
                        />
                    </div>
                </header>

                <div className="shop-products__showcases sm2:grid-cols-2 mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-3 xl:mt-12 2xl:grid-cols-4">
                    {/* Rendered products */}
                    {filteredProducts &&
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}

                    {/* Skeletons loading */}
                    {productsLoading &&
                        Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-[228px] w-full rounded-lg lg:h-[200px] xl:h-[260px] 2xl:h-[235px]"
                            />
                        ))}

                    {/* If an error occured */}
                    {productsError && (
                        <h4 className="col-span-3 w-full text-xl xl:text-2xl">
                            Un erreur s'est produit
                        </h4>
                    )}

                    {/* If no items in shop */}
                    {!productsLoading &&
                        isProductsLoaded &&
                        (filteredProducts.length === 0 || productsError) && (
                            <h4 className="col-span-3 w-full text-xl xl:text-2xl">
                                Pas de produits correspondants
                            </h4>
                        )}
                </div>
            </div>
        </Fragment>
    );
};

export default ShopContent;
