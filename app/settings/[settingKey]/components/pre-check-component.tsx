"use client";
import NavbarTest from "@/app/navbar";
import { CurrentUser } from "@/app/types/types";
import InformationComponent from "@/components/information-component";
import Spinner from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import RightSideBarContent from "./right-sidebar-content";
import { SettingKey } from "@/app/enums/enums";
import { capitalizeFirstLetter } from "@/lib/helper";

const LinkItems = Object.values(SettingKey).map((item) => {
    return {
        path: "/settings/" + item,
        label: "Change " + capitalizeFirstLetter(item),
        key: item,
    };
});

const SettingKeyComponent = () => {
    const params = useParams();
    const { data, isFetching, error } = useQuery<{ data: CurrentUser }>({
        queryKey: ["current-user"],
        queryFn: async () => await axios.get("/api/me"),
    });

    if (isFetching && !data) return <Spinner />;

    if (!isFetching && !data && error) {
        return (
            <InformationComponent
                header={"Something went wrong"}
                description={error.message}
                link={{
                    to: "/",
                    text: "Back To Home",
                }}
            />
        );
    }

    if (data) {
        return (
            <>
                <NavbarTest user={data.data} />
                <div className="container mx-auto py-10">
                    <div className="flex">
                        <div className="w-64 px-4 py-2 overflow-y-auto h-screen">
                            <h4 className="text-xl font-semibold tracking-tight mb-6">
                                User Settings
                            </h4>
                            <ul>
                                {LinkItems.map((item) => {
                                    return (
                                        <li>
                                            <Link
                                                key={item.key}
                                                href={item.path}
                                                className={`text-blue-500 hover:underline leading-7 [&:not(:first-child)]:mt-6 ${
                                                    params.settingKey ===
                                                    item.key
                                                        ? "font-bold"
                                                        : ""
                                                }`}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="flex-1 p-4">
                            <RightSideBarContent
                                settingKey={params.settingKey as SettingKey}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default SettingKeyComponent;
