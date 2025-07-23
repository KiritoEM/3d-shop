import { FC } from "react";
import { IconProps } from "@/icons";
import { ITransaction } from "@/models/transactionModel";
import { IUser } from "@/models/userModel";
import { IProduct } from "@/models/productModel";

export type ISidebarMenuItem = {
    Icon: FC<IconProps>;
    ActiveIcon?: FC<IconProps>;
    label: string;
    url?: string;
    isClosed?: boolean;
    isLg?: boolean;
    fn?: () => void;
};

export type IStatisticCard = {
    icon: string;
    badgeBg: string;
    statistic?: number;
    label: string;
    iconClass?: string;
};

export type ITransactionsColumns = Pick<
    ITransaction,
    | "id"
    | "customerName"
    | "customerEmail"
    | "createdAt"
    | "status"
    | "amount"
    | "user"
>;

export type IUsersColumns = Pick<
    IUser,
    "id" | "name" | "email" | "image" | "createdAt" | "accounts"
>;

export type IProductsColumns = Pick<
    IProduct,
    "id" | "name" | "description" | "price" | "category" | "createdAt"
>;
