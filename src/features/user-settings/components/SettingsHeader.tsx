"use client";

import { Button } from "@/components/ui/button";
import { Logout } from "@/icons";
import { signOut } from "next-auth/react";

const SettingsHeader = (): JSX.Element => {
    const handleSignOut = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };
    return (
        <header className="settings-header flex items-center justify-between">
            <h3 className="font-michroma text-3xl lg:text-4xl">Paramètres</h3>

            <Button
                className="text-destructive hover:text-destructive text-md"
                variant="ghost"
                size="lg"
                onClick={handleSignOut}
            >
                <Logout className="size-5" /> Se déconnecter
            </Button>
        </header>
    );
};

export default SettingsHeader;
