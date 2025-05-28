"use client";

import MainNav from "@/components/layouts/main-nav";
import PlaySound from "@/components/PlaySound";

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
    </main>
  );
}
