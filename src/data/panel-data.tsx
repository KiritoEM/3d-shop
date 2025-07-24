import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatIntoPrice } from "@/lib/utils";
import {
    IProductsColumns,
    IStatisticCard,
    ITransactionsColumns,
    IUsersColumns,
} from "../constants/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IStep } from "@/types";
import AddProductForm from "@/features/panel/components/products/AddProductForm";
import AddProductStudio from "@/features/panel/components/products/AddProductStudio";

type IStatisticCardData = Record<string, IStatisticCard>;

export const STATISTICS_CARD_DATA: IStatisticCardData = {
    users: {
        badgeBg: "rgba(250, 180, 103, 0.20)",
        icon: "/icons/users-illustration.svg",
        label: "Utilisateurs",
        iconClass: "relative -top-3",
    },
    product: {
        badgeBg: "rgba(194, 243, 255, 0.20)",
        icon: "/icons/products-illustration.svg",
        label: "Produits disponibles",
    },
    transactions: {
        badgeBg: "rgba(212, 128, 255, 0.20)",
        icon: "/icons/transactions-illustration.svg",
        label: "Transactions",
    },
};

export const TRANSACTIONS_COLUMNS: ColumnDef<ITransactionsColumns>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Séléctionner tout"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Séléctionner une ligne"
            />
        ),
    },
    {
        accessorFn: (row) => row.user?.image,
        accessorKey: "customerName",
        header: "Nom client",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <Avatar
                    name={row.getValue("customerName")}
                    image={row.original.user?.image ?? ""}
                    className="!size-8"
                />

                <span>{row.getValue("customerName")}</span>
            </div>
        ),
    },
    {
        accessorKey: "customerEmail",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Email
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("customerEmail")}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => (
            <div className="lowercase">
                {new Date(row.getValue("createdAt")).toLocaleDateString()}
            </div>
        ),
    },
    {
        accessorKey: "amount",
        header: "Montant",
        cell: ({ row }) => (
            <div className="lowercase">
                {formatIntoPrice(row.getValue("amount"))}€
            </div>
        ),
    },
];

export const USERS_COLUMNS: ColumnDef<IUsersColumns>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Séléctionner tout"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Séléctionner une ligne"
            />
        ),
    },
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => (
            <div className="flex items-center gap-4">
                <Avatar
                    name={row.getValue("name")}
                    image={row.getValue("image") ?? ""}
                    className="!size-8"
                />

                <span>{row.getValue("name")}</span>
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Email
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Date de création",
        cell: ({ row }) => (
            <div className="lowercase">
                {new Date(row.getValue("createdAt")).toLocaleDateString()}
            </div>
        ),
    },
    {
        accessorFn: (row) => row.accounts[0]?.type,
        accessorKey: "authType",
        header: "Authentification",
        cell: ({ row }) => {
            const accountType = !row.original.accounts.length
                ? "credentials"
                : row.original.accounts[0]?.type.toLowerCase();

            const renderBadge = (accountType: string) => {
                switch (accountType) {
                    case "oauth":
                        return (
                            <div className="auth-badge w-fit rounded-full bg-violet-500/10 px-4 py-2 text-violet-500">
                                {accountType}
                            </div>
                        );

                    case "credentials":
                        return (
                            <div className="auth-badge w-fit rounded-full bg-blue-500/10 px-4 py-2 text-blue-500">
                                {accountType}
                            </div>
                        );

                    default:
                        break;
                }
            };

            return <>{renderBadge(accountType)}</>;
        },
        filterFn: (row, id, value) => {
            return row.original.accounts.some((account: any) =>
                account.type.toLowerCase().includes(value.toLowerCase()),
            );
        },
    },
];

export const PRODUCTS_COLUMNS: ColumnDef<IProductsColumns>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Séléctionner tout"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Séléctionner une ligne"
            />
        ),
    },
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div
                className="flex w-[610px]"
                style={{ whiteSpace: "normal", overflowWrap: "break-word" }}
            >
                <p>{row.getValue("description")}</p>
            </div>
        ),
    },
    {
        accessorKey: "price",
        header: "Prix",
        cell: ({ row }) => (
            <div className="lowercase">
                {formatIntoPrice(row.getValue("price"))}€
            </div>
        ),
    },
    {
        accessorFn: (row) => row.category.name,
        accessorKey: "category",
        header: "Catégorie",
        cell: ({ row }) => <div>{row.original.category.name}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="max-w-lg">
                        <DropdownMenuItem>
                            <Edit2 /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                            <Trash2 /> Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export const MULTIFORM_DATA: IStep[] = [
    {
        name: "Informations sur le produit",
        component: AddProductForm,
    },
    {
        name: "Personnaliser le produit",
        component: AddProductStudio,
    },
];
