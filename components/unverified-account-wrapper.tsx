import { CurrentUser } from "@/app/types/types";
import Link from "next/link";
import React from "react";

const UnverifiedAccount = ({
    user,
    children,
}: {
    user: CurrentUser;
    children: React.ReactNode;
}) => {
    if (user.isVerified) {
        return children;
    }

    if (!user.isVerified) {
        return (
            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-4xl font-bold">You're almost done</p>
                        <p className="text-sm text-gray-500">
                            Check your email to finish registration
                        </p>
                        <p className="text-sm text-gray-500">
                            Haven't received the link email yet? Click{" "}
                            <Link href={"resend-confirmation"}>here</Link> to
                            resend.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
};

export default UnverifiedAccount;
