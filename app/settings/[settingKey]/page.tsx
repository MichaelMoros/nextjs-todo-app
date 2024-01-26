"use client";
import InformationComponent from "@/components/information-component";
import { useParams } from "next/navigation";
import React from "react";
import { SettingKey } from "@/app/enums/enums";
import SettingKeyComponent from "./components/pre-check-component";

const allowedSubPath = Object.values(SettingKey);

const ParentComponent = () => {
    const params = useParams();

    if (!allowedSubPath.includes(params.settingKey as SettingKey)) {
        return (
            <InformationComponent
                header={"Not Found"}
                description={"This resource is not available"}
                link={{
                    to: "/settings",
                    text: "Go to Settings",
                }}
            />
        );
    } else return <SettingKeyComponent />;
};

export default ParentComponent;
