"use client";

import MainNav from "@/components/layouts/main-nav";
import PlaySound from "@/components/PlaySound";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full overflow-hidden">
      <MainNav />
      <PlaySound />
      {children}
      <ThemeToggle />
    </main>
  );
}
