"use client";

import { SIDEBAR_DATA } from "@/constants/constants";
import { ISidebarMenuItem } from "@/constants/types";
import { Logo } from "@/icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { FC, ReactNode } from "react";

type MenuBlockProps = {
    title: string;
    children: ReactNode;
};

const MenuBlock: FC<MenuBlockProps> = ({ children, title }): JSX.Element => {
    return (
        <div className="menu-block">
            <header className="ml-2">
                <p className="text-muted-foreground/80 text-sm">
                    {title.toUpperCase()}
                </p>
            </header>

            <div className="menu-block__items mt-3 flex flex-col space-y-1">
                {children}
            </div>
        </div>
    );
};

const MenuItem: FC<ISidebarMenuItem> = ({
    ActiveIcon,
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
                <div className="bg-primary absolute -left-[13.8px] h-[48px] w-5 rounded-lg" />
            )}
            {isActive && ActiveIcon ? (
                <ActiveIcon className="text-primary size-5" />
            ) : (
                <Icon className="text-muted-foreground size-5 group-hover:text-white" />
            )}{" "}
            <span
                className={cn(
                    isActive
                        ? "font-medium text-white"
                        : "text-muted-foreground group-hover:text-white",
                )}
            >
                {label}
            </span>
        </article>
    );
};

const Sidebar = (): JSX.Element => {
    return (
        <aside className="sidebar fixed inset-y-0 left-0 z-10 hidden w-[320px] p-4 lg:flex">
            <nav className="sidebar__container bg-gray relative flex w-full flex-col overflow-x-hidden rounded-2xl px-4 pt-8">
                <Logo className="main-nav__logo ml-2 w-32 cursor-pointer text-[#0D0D0D] sm:w-40 lg:w-40 dark:text-white" />

                <div className="menu-items mt-14 flex flex-col space-y-8">
                    <MenuBlock title="MENU">
                        {SIDEBAR_DATA.menu.map((item, index) => (
                            <MenuItem key={index} {...item} />
                        ))}
                    </MenuBlock>

                    <MenuBlock title="GENERAL">
                        {SIDEBAR_DATA.general.map((item, index) => (
                            <MenuItem key={index} {...item} />
                        ))}
                    </MenuBlock>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
