import { CurrentUser } from "@/app/types/types";
import React from "react";

const UserDisplayName = ({ owner }: { owner: CurrentUser }) => {
    return <div>Welcome back, {owner.email}</div>;
};

export default UserDisplayName;
