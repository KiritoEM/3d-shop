"use client";

import { useRouter } from "next/navigation";
import React, { FC, Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { SIDEBAR_DATA } from "@/constants/constants";
import { Admin, AdminActive, Logo, Logout, LogoWithoutLabel } from "@/icons";
import { cn } from "@/lib/utils";
import { logoutAdmin } from "@/features/auth/actions/authActions";
import useDBSession from "@/hooks/useDBSession";
import DotLoadingScreen from "@/components/DotLoadingScreen";
import { useSidebar } from "@/store/sidebar";
import MenuBlock from "./MenuBlock";
import MenuItem from "./MenuItem";

const NavResponsive = dynamic(
    () => import("./responsive-sidebar/NavResponsive"),
    {
        ssr: false,
    },
);

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
        return <DotLoadingScreen text="Chargement en cours..." />;
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
                                "w-32 sm:w-40 lg:w-8",
                            )}
                        />
                    ) : (
                        <Logo
                            className={cn(
                                LOGO_BASE_STYLE,
                                "w-32 sm:w-40 lg:w-36",
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
                                    ActiveIcon={AdminActive}
                                    label="Administrateurs"
                                    url="/admin/administrator"
                                />
                            )}
                        </MenuBlock>

                        <MenuBlock title="GENERAL" isClosed={closed || isLg}>
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
