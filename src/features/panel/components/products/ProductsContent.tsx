"use client";

import { Fragment, useMemo } from "react";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { PRODUCTS_COLUMNS } from "@/data/panel-data";
import { sortDataByDate } from "@/lib/utils";
import usePagination from "@/hooks/usePagination";
import SkeletonFallback from "../SkeletonFallback";
import SectionHeader from "../SectionHeader";
import { getPaginatedProducts } from "../../services/productsServices";

const FILTER_OPTIONS = [
    {
        label: "Date",
        value: "createdAt",
    },
    {
        label: "Prix",
        value: "price",
    },
    {
        label: "Categorie",
        value: "category",
    },
];

const ProductsContent = (): JSX.Element => {
    const { paginationOpt, handleChangePagination } = usePagination();

    const { data: productsData, isLoading } = useQuery({
        queryKey: ["products", paginationOpt.skip],
        queryFn: () => getPaginatedProducts(paginationOpt.skip),
    });

    console.log(productsData);

    const sortedData = useMemo(() => {
        const dataToSort = productsData?.paginatedData || [];
        return sortDataByDate(dataToSort);
    }, [productsData]);

    return (
        <Fragment>
            <SectionHeader
                title="Produits"
                description="Listes des produits dans la plateforme"
                rightSide={
                    <Button>
                        <Plus />
                        Ajouter un produit
                    </Button>
                }
            />

            {isLoading ? (
                <SkeletonFallback className="mt-12" />
            ) : (
                <DataTable
                    inputPlaceholder="Nom de produit..."
                    inputValueFilter="name"
                    filterOptions={FILTER_OPTIONS}
                    columns={PRODUCTS_COLUMNS}
                    data={sortedData}
                    totalDataCount={productsData?.length}
                    onPageChange={handleChangePagination}
                />
            )}
        </Fragment>
    );
};

export default ProductsContent;
