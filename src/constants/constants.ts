import { LogOut, Moon, Settings, Sun } from "lucide-react";
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

export const NAV_DATA_AUTHENTICATED = [
    {
        label: "Paramètres",
        url: "/settings",
        icon: Settings
    },
    {
        label: "Déconnexion",
        icon: LogOut
    }
]

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

export const FLASK_BASE_URL = process.env.NEXT_PUBLIC_FLASK_BASE_URL || "http://localhost:5000";

export enum ERROR_CODE {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    INVALID_FILE_TYPE = 422
}

export enum SUCCESS_CODE {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
}