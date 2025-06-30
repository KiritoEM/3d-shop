"use client";

import {
    ThemeProviderProps,
    ThemeProvider as NextThemesProvider,
} from "next-themes";
import { FC } from "react";

const ThemeProvider: FC<ThemeProviderProps> = ({ children, ...props }) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
