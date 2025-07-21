"use client";

import { Plus } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/features/panel/components/SectionHeader";
import dynamic from "next/dynamic";
import AddAccountForm from "@/features/panel/components/administrators/AddAccountForm";

const AdminDialog = dynamic(
    () =>
        import("@/features/panel/components/administrators/Dialog").then(
            (mod) => ({ default: mod.AdminDialog }),
        ),
    {
        ssr: false,
    },
);
const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
        <section className="admin mt-8">
            <SectionHeader
                title="Administrateurs"
                description="Listes des comptes administrateurs"
                rightSide={
                    <AdminDialog
                        trigger={
                            <Button>
                                <Plus /> Ajouter un compte
                            </Button>
                        }
                        content={<AddAccountForm />}
                    />
                }
            />

            {children}
        </section>
    );
};

export default Layout;
