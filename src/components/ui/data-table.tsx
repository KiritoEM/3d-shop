"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import React, { FC, Fragment, useState } from "react";
import { Filter } from "@/icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import { InputWithIcon } from "./input";
import { Button } from "./button";

type TableFilteringProps = {
    placeholder: string;
    inputValue: string;
    onInputFilterChange: (value: string) => void;
    onDropdownChange: (value: string) => void;
};

const TableFiltering: FC<TableFilteringProps> = ({
    placeholder,
    inputValue,
    onInputFilterChange,
    onDropdownChange,
}): JSX.Element => {
    const [dropdownFilterValue, setFilterValue] = useState<string>("createdAt");
    return (
        <div className="payment-table-controls mb-6 mt-12 flex w-full items-center justify-between gap-4">
            <InputWithIcon
                Icon={<Search className="text-muted-foreground size-4" />}
                placeholder={placeholder}
                className="w-full max-w-[364px] text-sm sm:text-base"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onInputFilterChange(e.target.value)
                }
            />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Filter className="!text-foreground !size-5" />{" "}
                        <span className="hidden sm:block">Filtrer</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="max-w-56">
                    <DropdownMenuRadioGroup
                        value={dropdownFilterValue}
                        onValueChange={(value) => {
                            onDropdownChange(value);
                            setFilterValue(value);
                        }}
                    >
                        <DropdownMenuRadioItem value="createdAt">
                            Date
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="amount">
                            Montant
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

type PaginationActionsProps = {
    totalRow: number;
    currentRow: number;
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
    onNextPage: () => void;
    onPrevPage: () => void;
};

const PaginationActions: FC<PaginationActionsProps> = ({
    totalRow,
    currentRow,
    onNextPage,
    onPrevPage,
    isPrevDisabled,
    isNextDisabled,
}): JSX.Element => {
    return (
        <div className="pagination-actions flex items-center justify-between gap-4 py-6">
            <div className="pagination-actions__indicator">
                <p className="text-muted-foreground">
                    {totalRow ? `Page ${currentRow}/${totalRow}` : null}
                </p>
            </div>

            <div className="pagination-actions__buttons flex space-x-2">
                <Button
                    variant="outline"
                    onClick={onPrevPage}
                    disabled={isPrevDisabled}
                >
                    <ChevronLeft /> <span className="hidden sm:block">Précendent</span>
                </Button>

                <Button
                    variant="outline"
                    onClick={onNextPage}
                    disabled={isNextDisabled}
                >
                    <ChevronRight /> <span className="hidden sm:block">Suivant</span>
                </Button>
            </div>
        </div>
    );
};

interface DataTableProps<TData, TValue> extends React.ComponentProps<"table"> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    inputPlaceholder: string;
}

function DataTable<TData, TValue>({
    columns,
    data,
    inputPlaceholder,
    ...props
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        columns,
        data,
        initialState: {
            sorting: [
                {
                    id: "createdAt",
                    desc: true,
                },
            ],
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });

    return (
        <Fragment>
            <TableFiltering
                placeholder={inputPlaceholder}
                inputValue={
                    (table
                        .getColumn("customerName")
                        ?.getFilterValue() as string) ?? ""
                }
                onInputFilterChange={(value: string) =>
                    table
                        .getColumn("customerName")
                        ?.setFilterValue(value.trim())
                }
                onDropdownChange={(value: string) => {
                    setSorting([
                        {
                            id: value,
                            desc: true,
                        },
                    ]);
                }}
            />

            <Table {...props}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="!hover:bg-transparent h-24 text-center text-lg"
                            >
                                Aucune donnée
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <PaginationActions
                totalRow={table.getPageCount()}
                currentRow={
                    table.getRowCount() !== 0
                        ? table.getState().pagination.pageIndex + 1
                        : 0
                }
                isNextDisabled={!table.getCanNextPage()}
                isPrevDisabled={!table.getCanPreviousPage()}
                onPrevPage={() => table.previousPage()}
                onNextPage={() => table.nextPage()}
            />
        </Fragment>
    );
}

export { DataTable };
