import { cn } from "@/lib/utils";
import { MenuIcon, X } from "lucide-react";
import React, { FC } from "react";

type MenuIconProps = {
    isOpen: boolean;
    openNav: () => void;
} & React.ComponentProps<"div">;

const NavMenuIcon: FC<MenuIconProps> = ({
    isOpen,
    openNav,
    className,
    ...props
}): JSX.Element => {
    return (
        <div
            className={cn(
                "menu-icon bg-primary flex cursor-pointer items-center rounded-xl px-4 py-2 md:px-5 md:py-3 lg:hidden",
                className,
            )}
            onClick={openNav}
            {...props}
        >
            {!isOpen ? (
                <MenuIcon className="size-5 sm:size-6 md:size-7" />
            ) : (
                <X className="size-5 sm:size-6 md:size-7" />
            )}
        </div>
    );
};

export default NavMenuIcon;
