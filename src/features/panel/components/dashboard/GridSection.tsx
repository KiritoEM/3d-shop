"use client";

import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LastTransactions from "./LastTransactions";
import LastAddedProducts from "./LastAddedProducts";
import TransactionsChart from "./TransactionsChart";
import UserRadarStat from "./UserRadarStat";
import useDashboardData from "../../hooks/useDashboardData";

const SkeletonFallback = () => (
    <Skeleton className="user-card-skeleton flex h-[400px] items-center justify-center rounded-lg">
        <div className="h-9 w-9 animate-spin rounded-full border-b-2 border-current"></div>
    </Skeleton>
);

type GridSectionProps = {
    token: string;
};

const GridSection: FC<GridSectionProps> = ({ token }): JSX.Element => {
    const {
        isLastProductsDataLoading,
        isLastTransactionsDataLoading,
        isTransactionsDataLoading,
        isUsersDataLoading,
        lastProductsData,
        lastTransactionsData,
        usersFilledData,
        transactionsFilledData,
    } = useDashboardData(token);
    return (
        <div className="mt-8 grid grid-cols-2 gap-5">
            <div className="column-1 flex flex-col gap-5">
                {isLastTransactionsDataLoading ? (
                    <SkeletonFallback />
                ) : (
                    <LastTransactions transactionsData={lastTransactionsData} />
                )}

                {isTransactionsDataLoading ? (
                    <SkeletonFallback />
                ) : (
                    <TransactionsChart statsData={transactionsFilledData} />
                )}
            </div>

            <div className="column-2 flex flex-col gap-5">
                {isUsersDataLoading ? (
                    <SkeletonFallback />
                ) : (
                    <UserRadarStat statsData={usersFilledData} />
                )}

                {isLastProductsDataLoading ? (
                    <SkeletonFallback />
                ) : (
                    <LastAddedProducts
                        productsData={lastProductsData.mostSelledProducts}
                    />
                )}
            </div>
        </div>
    );
};

export default GridSection;
