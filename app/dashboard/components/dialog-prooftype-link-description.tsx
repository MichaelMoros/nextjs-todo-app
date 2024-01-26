import { FormDescription } from "@/components/ui/form";
import { Check, X } from "lucide-react";
import React from "react";

const DialogProofTypeLinkDescription = ({
    didParseToUrl,
}: {
    didParseToUrl: null | boolean;
}) => {
    if (didParseToUrl === null) {
        return null;
    }

    if (didParseToUrl === true) {
        return (
            <FormDescription className="flex items-center mt-2">
                <Check /> Looks good!
            </FormDescription>
        );
    }

    if (didParseToUrl === false) {
        return (
            <FormDescription className="flex items-center mt-2">
                <X />
                Precheck failed: Unable to parse new URL
            </FormDescription>
        );
    }
};

export default DialogProofTypeLinkDescription;
