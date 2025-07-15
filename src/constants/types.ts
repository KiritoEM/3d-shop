import { FC } from "react";
import { IconProps } from "@/icons";
import { ITransaction } from "@/models/transactionModel";

export type ISidebarMenuItem = {
    Icon: FC<IconProps>;
    ActiveIcon?: FC<IconProps>;
    label: string;
    url?: string;
    isClosed?: boolean;
    isLg?: boolean;
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
    "id" | "customerName" | "customerEmail" | "createdAt" | "status" | "amount"
>;
