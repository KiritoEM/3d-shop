import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FilterbarSkeleton = () => {
    return (
        <aside className="filter-bar-skeletons fixed hidden h-[calc(100vh-110px)] w-full max-w-[310px] space-y-8 pb-8 lg:block xl:max-w-[325px]">
            <Skeleton className="category-card h-[340px] w-full rounded-lg" />
            <Skeleton className="price-card h-[100px] w-full rounded-lg" />
        </aside>
    );
};

export default FilterbarSkeleton;
