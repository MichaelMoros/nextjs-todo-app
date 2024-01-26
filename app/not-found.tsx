import InformationComponent from "@/components/information-component";
import React from "react";

const NotFound = () => {
    return (
        <InformationComponent
            header={"Not Found"}
            description={"This resource is not available"}
            link={{
                to: "/",
                text: "Back to Home",
            }}
        />
    );
};

export default NotFound;
