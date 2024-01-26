import Link from "next/link";
import React from "react";

const ControlledLink = ({
    href,
    text,
    disabled,
}: {
    href: string;
    text: string;
    disabled: boolean;
}) => {
    return (
        <Link
            href={href}
            className={
                disabled
                    ? "pointer-events-none text-sm leading-none tracking-tight"
                    : "text-sm leading-none tracking-tight"
            }
        >
            {text}
        </Link>
    );
};

export default ControlledLink;
