import { FC } from "react";
import { IconProps } from "@/icons";

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
