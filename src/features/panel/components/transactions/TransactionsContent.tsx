"use client";

import { Fragment, useMemo } from "react";
import { ArrowUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { TRANSACTIONS_COLUMNS } from "@/data/panel-data";
import { download, makeCSV } from "@/lib/CSVUtilities";
import { sortDataByDate } from "@/lib/utils";
import { getPaginatedTransactions } from "../../services/transactionsServices";
import SkeletonFallback from "../SkeletonFallback";
import SectionHeader from "../SectionHeader";
import { ITransaction } from "@/models/transactionModel";

const FILTER_OPTIONS = [
    {
        label: "Date",
        value: "createdAt",
    },
    {
        label: "amount",
        value: "Montant",
    },
];

const TransactionsContent = () => {
    const { data: transactionsData, isLoading } = useQuery({
        queryKey: ["transactionsTable"],
        queryFn: () => getPaginatedTransactions(),
    });

    const sortedData = useMemo(() => {
        const dataToSort = transactionsData || [];
        return sortDataByDate(dataToSort);
    }, [transactionsData]);

    const handleDownloadCSV = () => {
        if (!transactionsData || transactionsData.length === 0) {
            console.warn("Aucune donnée à exporter");
            return;
        }

        type ITransactionCSVData = Omit<
            ITransaction,
            | "updatedAt"
            | "currency"
            | "userId"
            | "user"
            | "stripePaymentIntentId"
        >;

        const transactionCSVKeys = [
            "createdAt",
            "amount",
            "id",
            "stripeChargeId",
            "status",
            "customerEmail",
            "customerName",
        ] as (keyof ITransactionCSVData)[];

        const data = makeCSV<ITransactionCSVData, keyof ITransactionCSVData>(
            transactionsData,
            transactionCSVKeys,
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
                            !transactionsData ||
                            transactionsData.length === 0 ||
                            isLoading
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
                    inputValueFilter="customerName"
                    filterOptions={FILTER_OPTIONS}
                    columns={TRANSACTIONS_COLUMNS}
                    data={sortedData}
                />
            )}
        </Fragment>
    );
};

export default TransactionsContent;
