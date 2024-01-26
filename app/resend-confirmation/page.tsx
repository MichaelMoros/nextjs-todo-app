"use client";
import InformationComponent from "@/components/information-component";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingWrapper from "@/components/loading-wrapper";

const UserRegistrationConfirmation = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["resend-confirmation"],
        queryFn: async () => await axios.get("/api/resend-confirmation-email"),
    });

    return (
        <LoadingWrapper isLoading={isLoading} error={error} data={data}>
            <InformationComponent
                header={"Success"}
                description={
                    "Confirmation email has been sent, please check your inbox."
                }
                link={{
                    to: "/",
                    text: "Back to Home",
                }}
            />
        </LoadingWrapper>
    );
};

export default UserRegistrationConfirmation;
