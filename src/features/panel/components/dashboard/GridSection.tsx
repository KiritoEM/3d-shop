"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { transactionsMockData } from "@/__mock__/transactions-mock";
import { fillDataGroupbyMonth } from "@/lib/utils";
import { IUserStats } from "@/models/userModel";
import { ITransactionStats } from "@/models/transactionModel";
import { Skeleton } from "@/components/ui/skeleton";
import LastTransactions from "./LastTransactions";
import MostSelledProducts from "./MostSelledProducts";
import { useFilterData } from "../../hooks/useFilterData";
import {
    getTransactionsGroupbyMonth,
    getUsersGroupbyMonth,
} from "../../services/dashboardServices";
import TransactionsChart from "./TransactionsChart";
import UserRadarStat from "./UserRadarStat";

const SkeletonFallback = () => (
    <Skeleton className="user-card-skeleton flex h-[400px] items-center justify-center rounded-lg">
        <div className="h-9 w-9 animate-spin rounded-full border-b-2 border-current"></div>
    </Skeleton>
);

type GridSectionProps = {
    token: string;
};

const GridSection: FC<GridSectionProps> = ({ token }): JSX.Element => {
    const { year } = useFilterData();

    const { data: usersData, isLoading: isUsersDataLoading } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsersGroupbyMonth(token),
    });

    const { data: transactionsData, isLoading: isTransactionsDataLoading } =
        useQuery({
            queryKey: ["transactions", year],
            queryFn: () => getTransactionsGroupbyMonth(token, year),
        });

    const {
        data: lasTransactionsData,
        isLoading: isLasTransactionsDataLoading,
    } = useQuery({
        queryKey: ["transactions", year],
        queryFn: () => getTransactionsGroupbyMonth(token, year),
    });

    let usersFilledData: IUserStats[] = [];
    let transactionsFilledData: ITransactionStats[] = [];

    if (!isUsersDataLoading && !isTransactionsDataLoading) {
        usersFilledData = fillDataGroupbyMonth(usersData.stats) as IUserStats[];
        transactionsFilledData = fillDataGroupbyMonth(
            transactionsData.stats,
        ) as ITransactionStats[];
    }

    return (
        <div className="mt-8 grid grid-cols-2 gap-5">
            <div className="column-1 flex flex-col gap-5">
                {isLasTransactionsDataLoading ? (
                    <SkeletonFallback />
                ) : (
                    <LastTransactions transactionsData={lasTransactionsData} />
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

                <MostSelledProducts />
            </div>
        </div>
    );
};

export default GridSection;
