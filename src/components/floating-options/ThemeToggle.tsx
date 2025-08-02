"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Palette } from "@/icons";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEME_OPTIONS } from "@/constants/constants";
import { startViewTransition } from "@/lib/theme";

const MATCHED_PATH = ["/recommandations"];

const ThemeToggle = (): JSX.Element | null => {
    const [mounted, setMounted] = useState(false);
    const { setTheme, theme } = useTheme();
    const path = usePathname();

    const isMatchedPath = MATCHED_PATH.includes(path.toLowerCase());

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={cn(
                        "theme-toggle-trigger bg-primary h-12 w-12 cursor-pointer items-center justify-center rounded-full lg:h-14  lg:w-14 dark:bg-white",
                        isMatchedPath ? "hidden lg:flex" : "flex",
                    )}
                >
                    <Palette className="w-[24px] text-white md:w-[28px] lg:w-[26px] dark:text-[#E45826]" />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                side="top"
                className="w-[230px] border-none p-3 dark:bg-white"
                sideOffset={8}
            >
                <DropdownMenuLabel className="font-michroma text-[16px] text-[#0D0D0D]">
                    Choisir un thème
                </DropdownMenuLabel>

                <DropdownMenuGroup className="mt-1 space-y-1">
                    {THEME_OPTIONS.map((opt, index) => (
                        <DropdownMenuItem
                            key={index}
                            className={cn(
                                "relative dark:focus:bg-white/40",
                                theme === opt.value &&
                                    "border-primary text-primary pointer-events-none border",
                            )}
                            onClick={() =>
                                startViewTransition(() => setTheme(opt.value))
                            }
                        >
                            <div
                                className={`theme flex items-center space-x-2 ${theme === opt.value ? "text-primary" : "text-[#0D0D0D]"} cursor-pointer`}
                            >
                                <opt.icon
                                    className={
                                        theme === opt.value
                                            ? "text-primary"
                                            : "text-[#0D0D0D]"
                                    }
                                />
                                <span>{opt.label}</span>
                            </div>

                            {theme === opt.value && (
                                <div className="bg-primary absolute right-3 h-2 w-2 rounded-full"></div>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeToggle;
