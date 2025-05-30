import { Moon, Sun } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export const NAV_DATA = [
    {
        label: "Accueil",
        url: "/"
    },
    {
        label: "Shop",
        url: "/shop"
    },
    {
        label: "Recommandations",
        url: "/recommandations"
    }
];

export const THEME_OPTIONS = [
    {
        label: "Light",
        icon: Sun,
        value: "light"
    },
    {
        label: "Dark",
        icon: Moon,
        value: "dark"
    },
];

export const SOUND_STATUS = {
    PLAYING: "PLAYING",
    STOPPED: "STOPPED",
    PAUSED: "PAUSED"
} as const;

export const useScrollDefaultOptions = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1023px)" });

    const start = isMobile ? "+=25 88%" : isTablet ? "+=50 74%" : "+=20 88%";

    return {
        start,
        end: "bottom 8%",
        toggleActions: "play reverse play reverse",
    };
};