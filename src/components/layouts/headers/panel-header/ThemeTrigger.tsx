import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import React, { FC } from "react";

type ThemeTriggerProps = {
    isDark: boolean;
    changeTheme: () => void;
};

const ThemeTrigger: FC<ThemeTriggerProps> = ({ isDark, changeTheme }) => {
    return (
        <Button
            className="theme-trigger bg-gray !h-10 !w-10 rounded-full !px-0 !py-0 transition-transform duration-100 md:!h-11 md:!w-11 hover:[&>svg]:scale-110"
            size="lg"
            variant="secondary"
            title={isDark ? "Changer en mode Light" : "Changer en mode Dark"}
            onClick={changeTheme}
        >
            {isDark ? (
                <Sun className="m-auto size-4" />
            ) : (
                <Moon className="m-auto size-4" />
            )}
        </Button>
    );
};

export default ThemeTrigger;
