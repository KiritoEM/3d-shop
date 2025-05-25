import MainNav from "@/components/layouts/main-nav";
import { Fragment } from "react";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <MainNav />
      {children}
    </main>
  );
}
