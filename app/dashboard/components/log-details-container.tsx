import React from "react";

export const LogDetailsContainer = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="max-h-[600px] max-w-[700px]mx-auto overflow-y-scroll overflow-x-hidden">
            {children}
        </div>
    );
};
