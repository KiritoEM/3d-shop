import { FC } from "react";
import { IconProps } from "@/icons";

export type ISidebarMenuItem = {
    Icon: FC<IconProps>;
    ActiveIcon?: FC<IconProps>;
    label: string;
    url?: string;
    isClosed?: boolean;
};
