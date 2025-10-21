"use client";

import React, { Fragment, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import ProductCard from "@/features/shop/components/ProductCard";
import ProductSkeleton from "./skeletons/ProductSkeleton";
import FilterbarSkeleton from "./skeletons/FilterbarSkeleton";
import { useQuery } from "@tanstack/react-query";
import useShopStore from "../store/shopStore";
import { fetchProducts } from "../services/productServices";
import { fetchCategories } from "../services/categoryServices";
import SectionHeader from "./SectionHeader";

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
    const { searchValue, filters } = useShopStore();

    //products data fetching
    const {
        data: products,
        isLoading: productsLoading,
        error: productsError,
    } = useQuery({
        queryKey: [
            "products",
            searchValue,
            filters.category,
            filters.priceRange,
        ],
        queryFn: () => fetchProducts({ searchValue: searchValue, filters }),
    });

    //categories data fetching
    const { data: categories, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
    });

    return (
        <Fragment>
            {/* Sidebar - desktop and more */}
            <FilterSidebar
                categories={categories ?? []}
                priceRange={filters.priceRange!}
                categoriesLoading={categoriesLoading}
            />

            {/* Sidebar - mobile and tablet */}
            <FilterSidebarMobile
                categories={categories ?? []}
                priceRange={filters.priceRange!}
                isSidebarOpen={isSidebarOpen}
                closeSidebar={() => setOpenSidebar(false)}
                categoriesLoading={categoriesLoading}
            />

            <div className="shop-products mb-20 ml-0 mt-5 w-full md:mt-7 lg:ml-[355px] lg:w-[calc(100%-355px)] xl:ml-[370px] xl:w-[calc(100%-370px)]">
                {/* Section header */}
                <Suspense>
                    <SectionHeader onOpenSidebar={() => setOpenSidebar(true)} />
                </Suspense>

                {/* Product List */}
                <div className="shop-products__list sm2:grid-cols-2 mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-3 xl:mt-12 2xl:grid-cols-4">
                    {productsLoading ? (
                        // Skeletons loading
                        <ProductSkeleton />
                    ) : productsError ? (
                        // Error state
                        <h4 className="col-span-3 w-full text-xl">
                            Une erreur s'est produite
                        </h4>
                    ) : products?.paginatedData &&
                      products.paginatedData.length > 0 ? (
                        // Products display
                        products.paginatedData.map((product) => (
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
