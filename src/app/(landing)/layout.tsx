"use client";

import MainNav from "@/components/layouts/main-nav";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full overflow-hidden">
      <MainNav />
      {children}
    </main>
  );
}
