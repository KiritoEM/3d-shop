"use client";

import PanelHeader from "@/components/layouts/headers/PanelHeader";
import Sidebar from "@/components/layouts/navbars/sidebar";
import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { closed } = useSidebar();
    return (
        <main className="panel w-full">
            <Sidebar />

            <div
                className={cn(
                    "panel__content  p-4 pr-6",
                    closed
                        ? "ml-[110px] w-[calc(100%-110px)]"
                        : "w-[calc(100%-320px] ml-[320px]",
                )}
            >
                <PanelHeader />
                {children}
            </div>
        </main>
    );
}
