"use client";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import errorHelper from "@/lib/error";
import Spinner from "@/components/spinner";
import InformationComponent from "@/components/information-component";
import ResetPasswordForm from "./component/reset-password-form";
import NavbarTest from "../navbar";
import LoadingWrapper from "@/components/loading-wrapper";

const ForgotPassword = () => {
    const searchParams = useSearchParams();
    const tokenId = searchParams.get("token");

    if (!tokenId) {
        return (
            <InformationComponent
                header={"Bad Request"}
                description={"Route expects search param token"}
                link={{
                    to: "/",
                    text: "Back to Home",
                }}
            />
        );
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ["reset-password"],
        queryFn: async () =>
            await axios.get("/api/reset-password?token=" + tokenId),
    });

    return (
        <LoadingWrapper isLoading={isLoading} error={error} data={data}>
            <ResetPasswordForm token={tokenId} />
        </LoadingWrapper>
    );
};

export default ForgotPassword;
