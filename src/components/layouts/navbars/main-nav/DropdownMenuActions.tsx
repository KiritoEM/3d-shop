"use client";

import { FC } from "react";
import {
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { NAV_DATA_AUTHENTICATED } from "@/constants/constants";

type DropdownMenuActionsProps = {
    data: typeof NAV_DATA_AUTHENTICATED;
    actions: (key: string) => void;
};

const DropdownMenuAuthentificatedActions: FC<DropdownMenuActionsProps> = ({
    data,
    actions,
}) => {
    return (
        <DropdownMenuContent className="flex w-48 flex-col gap-2 p-3">
            {data.map((item, index) => (
                <DropdownMenuItem
                    key={index}
                    className="animated-label flex cursor-pointer items-center gap-3 text-base transition-opacity hover:opacity-70"
                    onClick={() => actions(item.key)}
                >
                    <item.icon /> <span>{item.label}</span>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    );
};

export default DropdownMenuAuthentificatedActions;
