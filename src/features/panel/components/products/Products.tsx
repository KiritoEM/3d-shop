"use client";

import { Fragment, useMemo, useTransition } from "react";
import Link from "next/link";
import { Edit2, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { PRODUCTS_COLUMNS } from "@/data/panel-data";
import { sortDataByDate } from "@/lib/utils";
import usePagination from "@/hooks/usePagination";
import SkeletonFallback from "../SkeletonFallback";
import SectionHeader from "../SectionHeader";
import { getPaginatedProducts } from "../../services/productsServices";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteproductById } from "../../actions/productActions";
import { toast } from "react-toastify";
import { IProductsColumns } from "@/constants/types";
import { Row } from "@tanstack/react-table";

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
    const [isPending, startTransition] = useTransition();

    const { data: productsData, isLoading } = useQuery({
        queryKey: ["products", paginationOpt.skip],
        queryFn: () => getPaginatedProducts(paginationOpt.skip),
    });

    const sortedData = useMemo(() => {
        const dataToSort = productsData?.paginatedData || [];
        return sortDataByDate(dataToSort);
    }, [productsData]);

    //delete product
    const handleDeleteProduct = (id: number) => {
        startTransition(async () => {
            const isProductDeleted = await deleteproductById(id);

            toast(isProductDeleted.message, {
                type: isProductDeleted.status === "error" ? "error" : "success",
                theme: "colored",
            });
        });
    };

    //row action
    const rowAction = {
        id: "actions",
        enableHiding: false,
        cell: ({ row }: { row: Row<IProductsColumns> }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="max-w-lg">
                        {/* <DropdownMenuItem>
                            <Edit2 /> Modifier
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() =>
                                handleDeleteProduct(Number(row.original.id))
                            }
                            className="cursor-pointer"
                        >
                            <Trash2 /> Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    };

    return (
        <div className="products-content">
            <SectionHeader
                title="Produits"
                description="Listes des produits dans la plateforme"
                rightSide={
                    <Button disabled={isPending} asChild>
                        <Link href="/admin/products/create">
                            <Plus />
                            Ajouter un produit
                        </Link>
                    </Button>
                }
            />

            {isLoading ? (
                <SkeletonFallback className="mt-12" />
            ) : isPending ? (
                <SkeletonFallback
                    label="Supression en cours..."
                    className="mt-12"
                />
            ) : (
                <DataTable
                    inputPlaceholder="Nom de produit..."
                    inputValueFilter="name"
                    filterOptions={FILTER_OPTIONS}
                    columns={[...PRODUCTS_COLUMNS, rowAction]}
                    data={sortedData}
                    totalDataCount={productsData?.length}
                    onPageChange={handleChangePagination}
                />
            )}
        </div>
    );
};

export default ProductsContent;
