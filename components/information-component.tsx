"use client";
import React from "react";
import Link from "next/link";
import CenteredContainer from "./centered-container";
import { Button } from "@/components/ui/button";

type InformationComponentProps = {
    header: string;
    description: string;
    refreshButton?: boolean;
    link: { to: string; text: string };
};

const InformationComponent: React.FC<InformationComponentProps> = ({
    header,
    description,
    link,
}) => {
    return (
        <CenteredContainer>
            <div className="text-center">
                <div className="mb-3">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        {header}
                    </h2>
                </div>
                <div className="mb-3">
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {description}
                    </p>
                </div>
                <div>
                    <Link href={`${link.to}`}>
                        <Button>{link.text}</Button>
                    </Link>
                </div>
            </div>
        </CenteredContainer>
    );
};

export default InformationComponent;
