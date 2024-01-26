"use client";
import React, { useContext } from "react";
import { CurrentUser, Theme } from "./types/types";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOutTextButton from "@/components/sign-out-text-button";
import { ThemeContext } from "./theme-state-provider";

const Navbar = ({ user }: { user?: CurrentUser }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <>
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link
                        href={user ? "/dashboard" : "/"}
                        className="text-white font-bold"
                    >
                        Rooutine
                    </Link>
                    {!user ? (
                        <div className="space-x-4">
                            <Link href="/sign-up" className="px-4 text-white">
                                Sign Up
                            </Link>
                            <Link href="/sign-in" className="px-4 text-white">
                                Sign In
                            </Link>
                        </div>
                    ) : (
                        <DropdownMenu>
                            {!user.isVerified ? (
                                <>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage
                                                src={user.avatar}
                                                alt="user avatar"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <SignOutTextButton />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage
                                                src={user.avatar}
                                                alt="user avatar"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>
                                            Theme
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioGroup
                                            value={themeContext.theme}
                                            onValueChange={(e) =>
                                                themeContext.setTheme(
                                                    e as Theme
                                                )
                                            }
                                        >
                                            <DropdownMenuRadioItem value="system">
                                                System
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="light">
                                                Light
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem value="dark">
                                                Dark
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                        <DropdownMenuLabel>
                                            Account
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link href="/settings">
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <SignOutTextButton />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </>
                            )}
                        </DropdownMenu>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
