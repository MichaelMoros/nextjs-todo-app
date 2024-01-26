import React, { ReactNode } from "react";

const CenteredContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "90vh",
                marginTop: "20px",
            }}
        >
            {children}
        </div>
    );
};

export default CenteredContainer;
