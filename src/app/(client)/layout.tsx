"use client";

import FloatingOptions from "@/components/FloatingOptions";
import MainNav from "@/components/layouts/navbars/main-nav";
import PlayBackgroundSound from "@/components/PlayBackgroundSound";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="w-full">
            <MainNav />
            <PlayBackgroundSound />
            {children}
            <FloatingOptions />
        </main>
    );
}
