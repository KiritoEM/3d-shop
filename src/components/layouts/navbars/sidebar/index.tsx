"use client";

import { SIDEBAR_DATA } from "@/constants/constants";
import { ISidebarMenuItem } from "@/constants/types";
import useSidebar from "@/hooks/useSidebar";
import { Logo, LogoWithoutLabel } from "@/icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { FC, ReactNode } from "react";

type MenuBlockProps = {
    title: string;
    children: ReactNode;
    isClosed?: boolean;
};

const MenuBlock: FC<MenuBlockProps> = ({
    children,
    title,
    isClosed = false,
}): JSX.Element => {
    return (
        <div className="menu-block">
            {!isClosed && (
                <header className="ml-2">
                    <p className="text-muted-foreground/80 text-sm">
                        {title.toUpperCase()}
                    </p>
                </header>
            )}

            <div className="menu-block__items mt-3 flex flex-col space-y-1">
                {children}
            </div>
        </div>
    );
};

const MenuItem: FC<ISidebarMenuItem> = ({
    ActiveIcon,
    isClosed,
    Icon,
    label,
    url,
}): JSX.Element => {
    const path = usePathname();
    const isActive = url ? path.startsWith(url.toLowerCase()) : false;
    return (
        <article
            className={cn(
                "menu-item flex cursor-pointer items-center space-x-4 rounded-lg px-3 py-3",
                !isActive && "hover:bg-primary/10 group",
            )}
        >
            {isActive && (
                <div className="bg-primary absolute -left-[14px] h-[48px] w-5 rounded-lg" />
            )}
            {isActive && ActiveIcon ? (
                <ActiveIcon className="text-primary size-5" />
            ) : (
                <Icon className="text-muted-foreground size-5 group-hover:text-white" />
            )}{" "}
            {!isClosed && (
                <span
                    className={cn(
                        isActive
                            ? "font-medium text-white"
                            : "text-muted-foreground group-hover:text-white",
                    )}
                >
                    {label}
                </span>
            )}
        </article>
    );
};

const Sidebar = (): JSX.Element => {
    const { closed } = useSidebar();
    const LOGO_BASE_STYLE =
        "main-nav__logo ml-2 cursor-pointer text-[#0D0D0D] dark:text-white";
    return (
        <aside
            className={cn(
                "sidebar fixed inset-y-0 left-0 z-10 hidden p-4 transition-all ease-in-out lg:flex",
                closed ? "w-[110px]" : "w-[320px]",
            )}
        >
            <nav className="sidebar__container bg-gray relative flex w-full flex-col overflow-x-hidden rounded-2xl px-4 pt-8">
                {closed ? (
                    <LogoWithoutLabel
                        className={cn(LOGO_BASE_STYLE, "w-32 sm:w-40 lg:w-9")}
                    />
                ) : (
                    <Logo
                        className={cn(LOGO_BASE_STYLE, "w-32 sm:w-40 lg:w-40")}
                    />
                )}

                <div className="menu-items mt-14 flex flex-col space-y-8">
                    <MenuBlock title="MENU" isClosed={closed}>
                        {SIDEBAR_DATA.menu.map((item, index) => (
                            <MenuItem key={index} isClosed={closed} {...item} />
                        ))}
                    </MenuBlock>

                    <MenuBlock title="GENERAL" isClosed={closed}>
                        {SIDEBAR_DATA.general.map((item, index) => (
                            <MenuItem key={index} isClosed={closed} {...item} />
                        ))}
                    </MenuBlock>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
