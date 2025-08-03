"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { FC } from "react";
import { ISidebarMenuItem } from "@/constants/types";
import { cn, isFunction } from "@/lib/utils";

const MenuItem: FC<ISidebarMenuItem & { isClosed: boolean; isLg: boolean }> = ({
    ActiveIcon,
    isClosed,
    isLg,
    Icon,
    label,
    url,
    fn,
}): JSX.Element => {
    const router = useRouter();
    const path = usePathname();
    const isActive = url ? path.startsWith(url.toLowerCase()) : false;

    return (
        <article
            className={cn(
                "menu-item flex cursor-pointer items-center space-x-4 rounded-lg px-3 py-3",
                !isActive && "hover:bg-primary/10 group",
            )}
            onClick={() =>
                fn && isFunction(fn)
                    ? fn()
                    : url && !isActive && router.push(url)
            }
        >
            {isActive && (
                <div className="bg-primary absolute -left-[14px] h-[48px] w-5 rounded-lg" />
            )}
            {isActive && ActiveIcon ? (
                <ActiveIcon className="text-primary size-5" />
            ) : (
                <Icon className="text-muted-foreground group-hover:text-foreground size-5" />
            )}{" "}
            {!isClosed && !isLg && (
                <span
                    className={cn(
                        isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground group-hover:text-foreground",
                    )}
                >
                    {label}
                </span>
            )}
        </article>
    );
};

export default MenuItem;
