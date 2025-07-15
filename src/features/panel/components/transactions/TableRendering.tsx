"use client";

import { DataTable } from "@/components/ui/data-table";
import { TRANSACTIONS_COLUMNS } from "@/constants/data/panel-data";
import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../services/transactionsServices";
import { FC, useMemo } from "react";
import SkeletonFallback from "../SkeletonFallback";
import { transactionsMockData } from "@/__mock__/transactions-mock";

type TableRenderingProps = {};

const TableRendering: FC<TableRenderingProps> = () => {
    const { data: transactionsData, isLoading } = useQuery({
        queryKey: ["transactionsTable"],
        queryFn: () => getAllTransactions(),
    });

    const sortedData = useMemo(() => {
        return [...transactionsMockData].sort((a, b) => {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        });
    }, []);

    return isLoading ? (
        <SkeletonFallback className="mt-12" />
    ) : (
        <DataTable
            inputPlaceholder="Nom de client..."
            columns={TRANSACTIONS_COLUMNS}
            data={sortedData}
        />
    );
};

export default TableRendering;
