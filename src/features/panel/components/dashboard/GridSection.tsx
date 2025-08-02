"use client";

import { FC } from "react";
import LastTransactions from "./tables/LastTransactions";
import LastAddedProducts from "./tables/LastAddedProducts";
import TransactionsChart from "./charts/TransactionsChart";
import UserRadarStat from "./charts/UserRadarStat";
import useDashboardData from "../../hooks/useDashboardData";
import SkeletonFallback from "../SkeletonFallback";

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
        <div className="mt-8 gap-5 sm:grid lg:grid-cols-2">
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

            <div className="column-2 mt-5 flex flex-col gap-5 lg:mt-0">
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
