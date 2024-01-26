"use client";

import { ThemeContext } from "@/app/theme-state-provider";
import { Theme } from "@/app/types/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useContext } from "react";

const ChangeTheme = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Change Theme
            </h1>

            <div className="mt-6">
                <RadioGroup
                    defaultValue={themeContext.theme}
                    onValueChange={(e) => themeContext.setTheme(e as Theme)}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="theme-system" />
                        <Label htmlFor="theme-system">System</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                </RadioGroup>
            </div>
        </>
    );
};

export default ChangeTheme;
