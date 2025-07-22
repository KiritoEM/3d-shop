"use client";

import { animateSideCannons } from "@/components/animations/confetti";

export const startViewTransition = (changeTheme: () => void) => {
    if ("startViewTransition" in document) {
        document.startViewTransition(() => {
            animateSideCannons();
            changeTheme();
        });
    }
};
