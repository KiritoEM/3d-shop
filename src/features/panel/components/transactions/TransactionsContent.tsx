"use client";

import { DataTable } from "@/components/ui/data-table";
import { TRANSACTIONS_COLUMNS } from "@/constants/data/panel-data";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { transactionsMockData } from "@/__mock__/transactions-mock";
import { download, makeCSV } from "@/lib/CSVUtilities";
import { getAllTransactions } from "../../services/transactionsServices";
import { FC, Fragment, useMemo } from "react";
import SkeletonFallback from "../SkeletonFallback";
import SectionHeader from "../SectionHeader";

type TransactionsContentProps = {};

const TransactionsContent: FC<TransactionsContentProps> = () => {
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

    const handleDownloadCSV = () => {
        const data = makeCSV(
            Object.keys(transactionsMockData[0]),
            transactionsMockData,
        );
        download(data, "payments-statistics");
    };

    return (
        <Fragment>
            <SectionHeader
                title="Paiements"
                rightSide={
                    <Button
                        onClick={handleDownloadCSV}
                        disabled={
                            transactionsMockData.length === 0 || isLoading
                        }
                    >
                        <ArrowUp /> Exporter en CSV
                    </Button>
                }
            />

            {isLoading ? (
                <SkeletonFallback className="mt-12" />
            ) : (
                <DataTable
                    inputPlaceholder="Nom de client..."
                    columns={TRANSACTIONS_COLUMNS}
                    data={sortedData}
                />
            )}
        </Fragment>
    );
};

export default TransactionsContent;
