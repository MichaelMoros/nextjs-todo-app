import { FormDescription } from "@/components/ui/form";
import { Check, X } from "lucide-react";
import React from "react";

const DialogProofTypeLinkDescription = ({
    showError,
}: {
    showError: null | boolean;
}) => {
    if (showError === null) {
        return (
            <FormDescription className="flex items-center pt-2 pb-0"></FormDescription>
        );
    }

    if (!showError) {
        return (
            <FormDescription className="flex items-center mt-2">
                <Check /> Looks good!
            </FormDescription>
        );
    }

    if (showError) {
        return (
            <FormDescription className="flex items-center mt-2">
                <X />
                Precheck failed: Unable to parse new URL
            </FormDescription>
        );
    }
};

export default DialogProofTypeLinkDescription;
