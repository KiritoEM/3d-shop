"use client";

import { Fragment, useCallback, useMemo } from "react";
import { ArrowUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { USERS_COLUMNS } from "@/data/panel-data";
import { sortDataByDate } from "@/lib/utils";
import { IUser } from "@/models/userModel";
import { download, makeCSV } from "@/lib/CSVUtilities";
import SectionHeader from "../SectionHeader";
import { getPaginatedUsers } from "../../services/usersServices";
import SkeletonFallback from "../SkeletonFallback";
import { usePagination } from "@/store/pagination";

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
    const { skip } = usePagination();

    const { data: usersData, isLoading } = useQuery({
        queryKey: ["usersTable", skip],
        queryFn: () => getPaginatedUsers(skip),
    });

    const sortedData = useMemo(() => {
        const dataToSort = usersData?.paginatedData || [];
        return sortDataByDate(dataToSort);
    }, [usersData]);

    const handleDownloadCSV = useCallback(() => {
        if (
            !usersData?.paginatedData ||
            usersData?.paginatedData.length === 0
        ) {
            console.warn("Aucune donnée à exporter");
            return;
        }

        type IUserCSVData = Omit<IUser, "password" | "updatedAt" | "accounts">;

        const userCSVKeys = [
            "id",
            "email",
            "image",
            "name",
            "emailVerified",
        ] as (keyof IUserCSVData)[];

        const data = makeCSV<IUserCSVData, keyof IUserCSVData>(
            usersData.paginatedData,
            userCSVKeys,
        );
        download(data, "payments-statistics");
    }, [usersData]);

    return (
        <Fragment>
            <SectionHeader
                title="Utilisateurs"
                description="Liste des utilisateurs de la plateforme"
                rightSide={
                    <Button
                        onClick={handleDownloadCSV}
                        disabled={
                            !usersData ||
                            !usersData?.paginatedData ||
                            usersData?.paginatedData.length === 0 ||
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
                    inputPlaceholder="Nom utilisateur..."
                    inputValueFilter="name"
                    filterOptions={FILTER_OPTIONS}
                    columns={USERS_COLUMNS}
                    data={sortedData}
                    totalDataCount={usersData?.totalCount}
                />
            )}
        </Fragment>
    );
};

export default UsersContent;
