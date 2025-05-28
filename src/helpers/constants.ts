import { useMediaQuery } from "react-responsive";

export const NAV_DATA = [
    {
        label: "Accueil",
        url: "#hero"
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