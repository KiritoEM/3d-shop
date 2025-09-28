import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type ProductSkeletonProps = {
    count?: number;
};

const ProductSkeleton = ({ count = 6 }: ProductSkeletonProps): JSX.Element => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <Skeleton
                    key={`product-skeleton-${i}`}
                    className="h-[228px] w-full rounded-lg lg:h-[200px] xl:h-[260px] 2xl:h-[235px]"
                />
            ))}
        </>
    );
};

export default ProductSkeleton;
