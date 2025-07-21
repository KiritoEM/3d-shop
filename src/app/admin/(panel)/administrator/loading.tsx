import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AdministratorLoading = () => {
    return (
        <div className="administrator-list-skeletons sm2:grid-cols-2 mt-10 grid gap-x-5 gap-y-6 lg:gap-x-5 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="admin-card-skeleton sm2:h-52 h-72 md:h-44 lg:h-52"
                />
            ))}
        </div>
    );
};

export default AdministratorLoading;
