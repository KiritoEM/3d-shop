"use client";

import { NAV_DATA, NAV_DATA_AUTHENTICATED } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FC, useRef } from "react";

type AuthentificatedActionsProps = {
    actions: (key: string) => void;
};

const AuthentificatedActions: FC<AuthentificatedActionsProps> = ({
    actions,
}): JSX.Element => {
    return (
        <div className="authentified-actions flex flex-col items-center gap-2">
            <hr className="authentified-actions__separator bg-border mt-5 h-[1px] w-full" />
            <div className="authentified-actions__items mt-3 w-full">
                <ul className="flex flex-col gap-5">
                    {NAV_DATA_AUTHENTICATED.map((item, index) => (
                        <li
                            key={index}
                            className="animated-label flex cursor-pointer items-center gap-3 text-base transition-opacity hover:opacity-70"
                            onClick={() => actions(item.key)}
                        >
                            <item.icon /> <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

type NavResponsiveProps = {
    isOpen: boolean;
    sessionStatus: string;
    actions: (key: string) => void;
};

const NavResponsive: FC<NavResponsiveProps> = ({
    isOpen,
    sessionStatus,
    actions,
}): JSX.Element => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll(".animated-label");

        if (isOpen) {
            gsap.set(items, {
                opacity: 0,
                y: 40,
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            });

            items.forEach((item, index) => {
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 0.6,
                    ease: "power2.out",
                    delay: index * 0.15 + 0.3,
                });
            });
        } else {
            items.forEach((item, index) => {
                gsap.to(item, {
                    opacity: 0,
                    y: 40,
                    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                    duration: 0.4,
                    ease: "power2.in",
                    delay: (items.length - 1 - index) * 0.1,
                });
            });
        }
    }, [isOpen]);

    return (
        <div
            className={cn(
                "nav-responsive duration-400 fixed top-[100px] z-50 flex w-full justify-end px-5 transition-all ease-in-out lg:hidden",
                isOpen ? "translate-x-0" : "translate-x-[100%]",
            )}
        >
            <div
                className="nav-responsive__container dark-linear w-full max-w-[266px] rounded-lg p-6"
                ref={containerRef}
            >
                <ul className="menu-items flex flex-col gap-5 lg:hidden">
                    {NAV_DATA.map((item, index) => (
                        <li
                            key={index}
                            className="animated-label cursor-pointer text-base transition-opacity hover:opacity-70"
                            style={{
                                opacity: 0,
                                clipPath:
                                    "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>

                {/* Actions if authenticated */}
                {sessionStatus === "authenticated" && (
                    <AuthentificatedActions actions={actions} />
                )}
            </div>
        </div>
    );
};

export default NavResponsive;
