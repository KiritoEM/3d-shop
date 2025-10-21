"use client";

import { useMediaQuery } from "react-responsive";
import PanelHeader from "@/components/layouts/headers/panel-header/PanelHeader";
import Sidebar from "@/components/layouts/navbars/sidebar/Sidebar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/sidebar";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { closed } = useSidebar();
    const isLg = useMediaQuery({
        query: "(min-width: 1024px) and (max-width: 1279px)",
    });
    return (
        <main className="panel w-full overflow-x-hidden">
            <Sidebar />

            <div
                className={cn(
                    "panel__content p-4 pr-6",
                    closed || isLg
                        ? "ml-0 w-full lg:ml-[110px] lg:w-[calc(100%-110px)]"
                        : "ml-0 w-full xl:ml-[304px] xl:w-[calc(100%-304px)] 2xl:ml-[320px] 2xl:w-[calc(100%-320px)]",
                )}
            >
                <PanelHeader />
                {children}
            </div>
        </main>
    );
}
