"use client";

import MainNav from "@/components/layouts/main-nav";
import PlayBackgroundSound from "@/components/PlayBackgroundSound";
import ThemeToggle from "@/components/ThemeToggle";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full overflow-hidden">
      <MainNav />
      <PlayBackgroundSound />
      {children}
      <ThemeToggle />
    </main>
  );
}
