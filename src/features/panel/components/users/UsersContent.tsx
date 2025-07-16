"use client";

import { Fragment, useMemo } from "react";
import { ArrowUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { USERS_COLUMNS } from "@/constants/data/panel-data";
import { usersMockData } from "@/__mock__/user-mock";
import { sortDataByDate } from "@/lib/utils";
import SectionHeader from "../SectionHeader";
import { getPaginatedUsers } from "../../services/usersServices";
import SkeletonFallback from "../SkeletonFallback";

const FILTER_OPTIONS = [
    {
        label: "Date",
        value: "createdAt",
    },
    {
        label: "Authentification",
        value: "authType",
    },
];

const UsersContent = (): JSX.Element => {
    const { data: usersData, isLoading } = useQuery({
        queryKey: ["transactionsTable"],
        queryFn: () => getPaginatedUsers(),
    });

    const sortedData = useMemo(() => {
        const dataToSort = usersData || [];
        return sortDataByDate(dataToSort);
    }, [usersData]);

    return (
        <Fragment>
            <SectionHeader
                title="Utilisateurs"
                description="Liste des utilisateurs de la plateforme"
                rightSide={
                    <Button
                    // onClick={handleDownloadCSV}
                    // disabled={
                    //     !transactionsData ||
                    //     transactionsData.length === 0 ||
                    //     isLoading
                    // }
                    >
                        <ArrowUp /> Exporter en CSV
                    </Button>
                }
            />

            {isLoading ? (
                <SkeletonFallback className="mt-12" />
            ) : (
                <DataTable
                    inputPlaceholder="Nom utilisateur..."
                    inputValueFilter="name"
                    filterOptions={FILTER_OPTIONS}
                    columns={USERS_COLUMNS}
                    data={sortedData}
                />
            )}
        </Fragment>
    );
};

export default UsersContent;
