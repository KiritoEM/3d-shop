"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { FC, Fragment, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { SIDEBAR_DATA } from "@/constants/constants";
import { ISidebarMenuItem } from "@/constants/types";
import useSidebar from "@/hooks/useSidebar";
import { Admin, Logo, Logout, LogoWithoutLabel } from "@/icons";
import { cn, isFunction } from "@/lib/utils";
import { logoutAdmin } from "@/features/auth/actions/authActions";
import useDBSession from "@/hooks/useDBSession";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";

const NavResponsive = dynamic(() => import("./NavResponsive"), {
    ssr: false,
});

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
> = ({ ActiveIcon, isClosed, isLg, Icon, label, url, fn }): JSX.Element => {
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

const Sidebar: FC = (): JSX.Element => {
    const { closed, isSidebarResponsiveOpen, setResponsiveSidebarState } =
        useSidebar();
    const { session, token } = useDBSession();
    const isLg = useMediaQuery({
        query: "(min-width: 1024px) and (max-width: 1279px)",
    });
    const router = useRouter();

    const isSuperAdmin = session?.role === "SUPERADMIN";

    if (!token || !session) {
        return <AuthLoadingScreen text="Chargement en cours..." />;
    }

    const handleLogout = async () => {
        const response = await logoutAdmin(token ?? null);

        if (response.status === "error") {
            toast(response.message, {
                theme: "colored",
                type: "error",
            });

            return;
        }

        router.replace("/admin/login");
    };

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

                            {isSuperAdmin && (
                                <MenuItem
                                    isClosed={closed || isLg}
                                    isLg={isLg}
                                    Icon={Admin}
                                    label="Administrateurs"
                                />
                            )}
                        </MenuBlock>

                        <MenuBlock title="GENERAL" isClosed={closed || isLg}>
                            {/* {SIDEBAR_DATA.general.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    isClosed={closed || isLg}
                                    isLg={isLg}
                                    {...item}
                                />
                            ))} */}
                            <MenuItem
                                isClosed={closed || isLg}
                                isLg={isLg}
                                Icon={Logout}
                                label="Se déconnecter"
                                fn={handleLogout}
                            />
                        </MenuBlock>
                    </div>
                </nav>
            </aside>

            <NavResponsive
                isOpen={isSidebarResponsiveOpen}
                isSuperAdmin={isSuperAdmin}
                closeSidebar={() => setResponsiveSidebarState(false)}
            />
        </Fragment>
    );
};

export default Sidebar;
