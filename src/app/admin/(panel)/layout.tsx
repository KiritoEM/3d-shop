"use client";

import PanelHeader from "@/components/layouts/panel-header";
import Sidebar from "@/components/layouts/sidebar";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="panel w-full">
            <Sidebar />

            <div className="panel__content w-[calc(100%-320px] ml-[320px] p-4 pr-6">
                <PanelHeader />
                {children}
            </div>
        </main>
    );
}
