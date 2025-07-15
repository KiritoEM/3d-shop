"use client";

import { usePathname } from "next/navigation";
import React, { FC, Fragment, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { SIDEBAR_DATA } from "@/constants/constants";
import { ISidebarMenuItem } from "@/constants/types";
import useSidebar from "@/hooks/useSidebar";
import { Logo, LogoWithoutLabel } from "@/icons";
import { cn } from "@/lib/utils";
import NavResponsive from "./NavResponsive";

type MenuBlockProps = {
    title: string;
    children: ReactNode;
    isClosed?: boolean;
};

export const MenuBlock: FC<MenuBlockProps> = ({
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

export const MenuItem: FC<
    ISidebarMenuItem & { isClosed: boolean; isLg: boolean }
> = ({ ActiveIcon, isClosed, isLg, Icon, label, url }): JSX.Element => {
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
            {!isClosed && !isLg && (
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

export const LOGO_BASE_STYLE =
    "main-nav__logo ml-2 cursor-pointer text-[#0D0D0D] dark:text-white";

const Sidebar = (): JSX.Element => {
    const { closed, isSidebarResponsiveOpen, setResponsiveSidebarState } =
        useSidebar();
    const isLg = useMediaQuery({
        query: "(min-width: 1024px) and (max-width: 1279px)",
    });

    return (
        <Fragment>
            <aside
                className={cn(
                    "sidebar fixed inset-y-0 left-0 z-10 hidden p-4 transition-all ease-in-out lg:flex",
                    closed || isLg ? "w-[110px]" : "xl:w-[304px] 2xl:w-[320px]",
                )}
            >
                <nav className="sidebar__container bg-gray relative flex w-full flex-col overflow-x-hidden rounded-2xl px-4 pt-8">
                    {closed || isLg ? (
                        <LogoWithoutLabel
                            className={cn(
                                LOGO_BASE_STYLE,
                                "w-32 sm:w-40 lg:w-9",
                            )}
                        />
                    ) : (
                        <Logo
                            className={cn(
                                LOGO_BASE_STYLE,
                                "w-32 sm:w-40 lg:w-40",
                            )}
                        />
                    )}

                    {/* Menu items */}
                    <div className="menu-items mt-14 flex flex-col space-y-8">
                        <MenuBlock title="MENU" isClosed={closed || isLg}>
                            {SIDEBAR_DATA.menu.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    isClosed={closed || isLg}
                                    isLg={isLg}
                                    {...item}
                                />
                            ))}
                        </MenuBlock>

                        <MenuBlock title="GENERAL" isClosed={closed || isLg}>
                            {SIDEBAR_DATA.general.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    isClosed={closed || isLg}
                                    isLg={isLg}
                                    {...item}
                                />
                            ))}
                        </MenuBlock>
                    </div>
                </nav>
            </aside>

            <NavResponsive
                isOpen={isSidebarResponsiveOpen}
                closeSidebar={() => setResponsiveSidebarState(false)}
            />
        </Fragment>
    );
};

export default Sidebar;
