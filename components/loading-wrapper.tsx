import React from "react";
import Spinner from "./spinner";
import InformationComponent from "./information-component";
import errorHelper from "@/lib/error";

const LoadingWrapper = ({
    isLoading,
    error,
    data,
    children,
}: {
    isLoading: boolean;
    error: Error | null;
    data: any;
    children: React.ReactNode;
}) => {
    if (isLoading && !data) return <Spinner />;

    if (!isLoading && error) {
        const displayError = errorHelper(error);
        return (
            <InformationComponent
                header={"Error"}
                description={displayError.message}
                link={{
                    to: "/",
                    text: "Back To Home",
                }}
            />
        );
    }

    if (!isLoading && data) {
        return children;
    }
};

export default LoadingWrapper;
