"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { CurrentUser } from "../types/types";
import NavbarTest from "../navbar";
import LoadingWrapper from "@/components/loading-wrapper";

const Settings = () => {
    const { data, isFetching, error } = useQuery<{ data: CurrentUser }>({
        queryKey: ["current-user"],
        queryFn: async () => await axios.get("/api/me"),
    });

    return (
        <LoadingWrapper isLoading={isFetching} error={error} data={data}>
            <NavbarTest user={data?.data} />
            <div className="container mx-auto py-10">
                <div className="flex">
                    <div className="w-64 px-4 py-2 overflow-y-auto h-screen">
                        <h4 className="text-xl font-semibold tracking-tight mb-6">
                            User Settings
                        </h4>
                        <ul>
                            <li>
                                <Link
                                    href="/settings/password"
                                    className="text-blue-500 hover:underline leading-7 [&:not(:first-child)]:mt-6"
                                >
                                    Change Password
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/settings/avatar"
                                    className="text-blue-500 hover:underline leading-7 [&:not(:first-child)]:mt-6"
                                >
                                    Change Avatar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/settings/theme"
                                    className="text-blue-500 hover:underline leading-7 [&:not(:first-child)]:mt-6"
                                >
                                    Change Theme
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex-1 p-4">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Settings Page
                        </h1>

                        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-2">
                            Use the items on the left to modify your account
                        </h2>
                    </div>
                </div>
            </div>
        </LoadingWrapper>
    );
};

export default Settings;
