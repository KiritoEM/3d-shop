"use client"

import { NAV_DATA } from "@/helpers/constants";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FC, useRef } from "react";

type NavResponsiveProps = {
    isOpen: boolean
}

const NavResponsive: FC<NavResponsiveProps> = ({ isOpen }): JSX.Element => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll(".menu-items__label");

        if (isOpen) {
            gsap.set(items, {
                opacity: 0,
                y: 40,
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
            });

            items.forEach((item, index) => {
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 0.6,
                    ease: "power2.out",
                    delay: index * 0.15 + 0.3
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
                    delay: (items.length - 1 - index) * 0.1
                });
            });
        }
    }, [isOpen]);

    return (
        <div className={
            cn(
                "nav-responsive w-full px-5 fixed top-[100px] z-50 flex lg:hidden justify-end transition-all ease-out duration-400",
                isOpen ? "translate-x-0" : "translate-x-[100%]"
            )
        }>
            <div className="nav-responsive__container rounded-lg dark-linear p-6 w-full max-w-[266px]" ref={containerRef}>
                <ul className="menu-items flex flex-col lg:hidden gap-7">
                    {NAV_DATA.map((item, index) => (
                        <li
                            key={index}
                            className="menu-items__label text-lg cursor-pointer hover:opacity-70 transition-opacity"
                            style={{
                                opacity: 0,
                                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                            }}
                        >
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NavResponsive;