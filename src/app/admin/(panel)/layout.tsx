"use client";

import Sidebar from "@/components/layouts/sidebar";

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="panel w-full">
            <Sidebar />
            {children}
        </main>
    );
}
