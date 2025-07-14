"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fillDataGroupbyMonth } from "@/lib/utils";
import { IUserStats } from "@/models/userModel";
import { ITransactionStats } from "@/models/transactionModel";
import { useFilterData } from "./useFilterData";
import {
    getLastProducts,
    getTransactionsGroupbyMonth,
    getUsersGroupbyMonth,
} from "../services/dashboardServices";

const useDashboardData = (token: string) => {
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
        data: lastTransactionsData,
        isLoading: isLastTransactionsDataLoading,
    } = useQuery({
        queryKey: ["lastTransactions"],
        queryFn: () => getTransactionsGroupbyMonth(token, year),
    });

    const { data: lastProductsData, isLoading: isLastProductsDataLoading } =
        useQuery({
            queryKey: ["lastProducts"],
            queryFn: () => getLastProducts(token),
        });

    const usersFilledData = useMemo(() => {
        if (!isUsersDataLoading && usersData) {
            return fillDataGroupbyMonth(usersData.stats);
        }
    }, [isUsersDataLoading, usersData]) as IUserStats[];

    const transactionsFilledData = useMemo(() => {
        if (!isTransactionsDataLoading && transactionsData) {
            return fillDataGroupbyMonth(transactionsData.stats);
        }
    }, [isTransactionsDataLoading, transactionsData]) as ITransactionStats[];

    return {
        isLastTransactionsDataLoading,
        isLastProductsDataLoading,
        isTransactionsDataLoading,
        isUsersDataLoading,
        lastTransactionsData,
        lastProductsData,
        usersFilledData,
        transactionsFilledData,
    };
};

export default useDashboardData;
