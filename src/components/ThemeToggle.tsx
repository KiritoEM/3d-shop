"use client"

import useViewportDimension from "@/hooks/useViewportDimension";
import { Palette } from "@/icons";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEME_OPTIONS } from "@/constants/constants";
import { useEffect, useState } from "react";
import { animateSideCannons } from "./animations/confetti";

const ThemeToggle = (): JSX.Element | null => {
    const [mounted, setMounted] = useState(false);
    const { viewportHeight } = useViewportDimension();
    // const isVisible = viewportHeight > 98;
    const { setTheme, theme } = useTheme();

    const handleToggleTheme = (theme: string) => {
        if ("startViewTransition" in document) {
            document.startViewTransition(() => {
                animateSideCannons();
                setTheme(theme);
            })
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className={
            cn(
                "fixed z-50 bottom-8 right-8 transition-all duration-400",
                // isVisible ? "translate-x-0 opacity-100" : "translate-x-150 opacity-0"
            )
        }>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="theme-toggle-trigger cursor-pointer p-4 rounded-full bg-primary dark:bg-white">
                        <Palette className="w-[28px] md:w-[32px]" color={theme === "light" ? "#ffffff" : "#E45826"} />
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    side="top"
                    className="w-[230px] border-none p-3 dark:bg-white"
                    sideOffset={8}
                >
                    <DropdownMenuLabel className="text-[16px] font-michroma text-[#0D0D0D]">
                        Choisir un thème
                    </DropdownMenuLabel>

                    <DropdownMenuGroup className="mt-1 space-y-1">
                        {THEME_OPTIONS.map((opt, index) => (
                            <DropdownMenuItem
                                key={index}
                                className={cn(
                                    "relative dark:focus:bg-white/40",
                                    theme === opt.value &&
                                    "pointer-events-none border border-primary text-primary",
                                )}
                                onClick={() => handleToggleTheme(opt.value)}
                            >
                                <div className={`theme flex items-center space-x-2 ${theme === opt.value ? "text-primary" : "text-[#0D0D0D]"} cursor-pointer`}>
                                    <opt.icon className={theme === opt.value ? "text-primary" : "text-[#0D0D0D]"} />
                                    <span>{opt.label}</span>
                                </div>

                                {theme === opt.value && (
                                    <div className="absolute right-3 h-2 w-2 rounded-full bg-primary"></div>
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ThemeToggle;