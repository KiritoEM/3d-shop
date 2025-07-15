import { X } from "lucide-react";
import { FC, Fragment } from "react";
import { Logo } from "@/icons";
import { LOGO_BASE_STYLE, MenuBlock, MenuItem } from ".";
import { cn } from "@/lib/utils";
import { SIDEBAR_DATA } from "@/constants/constants";
import { Button } from "@/components/ui/button";

type NavResponsiveProps = {
    isOpen: boolean;
    closeSidebar: () => void;
};

const NavResponsive: FC<NavResponsiveProps> = ({
    isOpen,
    closeSidebar,
}): JSX.Element => {
    return (
        <Fragment>
            <aside
                className={cn(
                    "responsive-sidebar fixed inset-y-0 left-0 z-50 max-h-[100dvh] w-full max-w-[320px] transition-all duration-100 lg:hidden",
                    isOpen
                        ? "translate-x-0 ease-out"
                        : "-translate-x-[100%] ease-in",
                )}
            >
                <nav className="responsive-sidebar__container bg-gray relative flex h-full w-full flex-col overflow-x-hidden px-6 pt-10">
                    <Button
                        variant="ghost"
                        className="close-btn border-input absolute right-6 top-6 w-fit cursor-pointer rounded-lg border p-2 !px-2 !py-0 "
                        onClick={closeSidebar}
                    >
                        <X />
                    </Button>

                    <Logo className={cn(LOGO_BASE_STYLE, "!w-34")} />

                    <div className="menu-items mt-12 flex flex-col space-y-6">
                        <MenuBlock title="MENU" isClosed={false}>
                            {SIDEBAR_DATA.menu.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    isClosed={false}
                                    isLg={false}
                                    {...item}
                                />
                            ))}
                        </MenuBlock>

                        <MenuBlock title="GENERAL" isClosed={false}>
                            {SIDEBAR_DATA.general.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    isClosed={false}
                                    isLg={false}
                                    {...item}
                                />
                            ))}
                        </MenuBlock>
                    </div>
                </nav>
            </aside>

            {/* Overlay */}
            <div
                className={cn(
                    "overlay bg-popover/65 fixed inset-0 z-40 h-[100dvh] w-screen transition-all",
                    isOpen ? "block delay-100" : "hidden",
                )}
                onClick={closeSidebar}
            />
        </Fragment>
    );
};

export default NavResponsive;
