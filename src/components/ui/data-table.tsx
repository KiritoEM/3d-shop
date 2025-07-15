"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Table } from "lucide-react";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";

interface DataTableProps<TData, TValue> extends React.ComponentProps<"table"> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

function DataTable<TData, TValue>({
    columns,
    data,
    ...props
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table {...table}>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
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
                            className="h-24 text-center text-lg"
                        >
                            Pas de résultats
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export { DataTable };
