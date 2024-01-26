import React from "react";
import ChangePasswordForm from "./change-password";
import ChangeAvatarForm from "./change-avatar";
import ChangeTheme from "./change-theme";
import { SettingKey } from "@/app/types/types";

const RightSideBarContent = ({ settingKey }: { settingKey: SettingKey }) => {
    if (settingKey === "password") return <ChangePasswordForm />;
    else if (settingKey === "avatar") return <ChangeAvatarForm />;
    else if (settingKey === "theme") return <ChangeTheme />;
    else return <h3>Unexpected Key</h3>;
};

export default RightSideBarContent;
