"use client";
import { useTheme } from "next-themes";
import React, { createContext, useEffect, useState } from "react";
import { Theme } from "./types/types";

interface ThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const THEMES = ["light", "dark", "system"];

const getUserTheme = (): Theme => {
    if (typeof window !== "undefined") {
        const _theme = window.localStorage.getItem("user-theme") as Theme;

        if (!THEMES.includes(_theme)) return "system";
        return _theme;
    }

    return "system";
};

export const ThemeContext = createContext<ThemeContextProps>({
    theme: getUserTheme(),
    setTheme: () => {},
});

const ThemeStateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { setTheme: changeThemeFunction } = useTheme();
    const [theme, setTheme] = useState<Theme>(getUserTheme());

    useEffect(() => {
        changeThemeFunction(theme);
        localStorage.setItem("user-theme", theme);
    }, [theme]);
    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeStateProvider;
