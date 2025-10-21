"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { FC, Fragment, JSX, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { NAV_DATA, NAV_DATA_AUTHENTICATED } from "@/constants/constants";
import { Logo } from "@/icons";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavMenuIcon from "../../MenuIcon";
import NavResponsive from "./responsive-nav/NavResponsive";
import SoundLottie from "./SoundLottie";
import DropdownMenuAuthentificatedActions from "./DropdownMenuActions";
import { Skeleton } from "@/components/ui/skeleton";

const MATCHED_PATH: string[] = ["/"];

type MenuItemsProps = {
    data: typeof NAV_DATA;
    path: string;
};

const MenuItems: FC<MenuItemsProps> = ({ data, path }): JSX.Element => {
    return (
        <ul className="menu-items hidden space-x-8 lg:flex">
            {data.map((item, index) => (
                <li key={index}>
                    <Link
                        href={item.url ?? "/"}
                        className={cn(
                            "menu-items__label",
                            path === item.url && "text-primary",
                        )}
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

// Main nav component
const MainNav = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const path = usePathname();
    const router = useRouter();
    const { data, status } = useSession();

    const isAbsolute = MATCHED_PATH.includes(path);

    const handleSignOut = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };

    const handleDropdownmenuActions = (key: string) => {
        switch (key) {
            case "logout":
                handleSignOut();
                break;

            case "settings":
                router.push("/settings");
                break;

            default:
                break;
        }
    };

    return (
        <Fragment>
            <nav
                className={cn(
                    "main-nav top-0 z-50 w-full",
                    isAbsolute ? "absolute" : "fixed backdrop-blur-sm",
                )}
            >
                <div className="main-nav__container sm2:py-2 container flex items-center justify-between py-5 lg:py-3">
                    <Logo
                        className="main-nav__logo lg:w-38 w-32 cursor-pointer text-[#0D0D0D] sm:w-40 dark:text-white"
                        onClick={() => router.push("/")}
                    />

                    <div className="actions flex items-center space-x-3 md:space-x-8 lg:space-x-10">
                        <div className="actions__container ml-3 flex items-center space-x-3 md:space-x-4 lg:space-x-6 xl:ml-5">
                            <MenuItems data={NAV_DATA} path={path} />

                            <SoundLottie />

                            {/* Loading session */}
                            {status === "loading" && (
                                <div className="avatar-skeleton">
                                    <Skeleton className="avatar-skeleton h-9 w-9 rounded-full" />
                                </div>
                            )}

                            {status === "authenticated" && data.user ? (
                                <Fragment>
                                    {/* For desktop */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="hidden lg:block">
                                            <Avatar
                                                image={data.user.image ?? ""}
                                                name={data.user.name!}
                                                className="!size-[2.1em]"
                                            />
                                        </DropdownMenuTrigger>

                                        <DropdownMenuAuthentificatedActions
                                            data={NAV_DATA_AUTHENTICATED}
                                            actions={handleDropdownmenuActions}
                                        />
                                    </DropdownMenu>

                                    {/* For mobile  */}
                                    <div className="avatar block lg:hidden">
                                        <Avatar
                                            className="!size-7 lg:!size-7"
                                            image={data.user.image ?? ""}
                                            name={data.user.name!}
                                            onClick={() => setIsOpen(!isOpen)}
                                        />
                                    </div>
                                </Fragment>
                            ) : (
                                <NavMenuIcon
                                    isOpen={isOpen}
                                    openNav={() => setIsOpen(!isOpen)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <NavResponsive
                isOpen={isOpen}
                sessionStatus={status}
                actions={handleDropdownmenuActions}
            />
        </Fragment>
    );
};

export default MainNav;
