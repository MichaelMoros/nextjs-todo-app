import { FormDescription } from "@/components/ui/form";
import { Check, X } from "lucide-react";
import React from "react";

const TextValidationDescription = ({
    successText,
    errorText,
    isChecking,
}: {
    successText: string | null;
    errorText: string | null;
    isChecking: boolean;
}) => {
    if (isChecking) {
        return (
            <FormDescription className="flex items-center pt-2 pb-0">
                <span
                    className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </span>
                <span className="ml-2">Checking...</span>
            </FormDescription>
        );
    }

    if (!isChecking && successText) {
        return (
            <FormDescription className="flex items-center mt-2">
                <Check /> {successText}
            </FormDescription>
        );
    }

    if (!isChecking && errorText) {
        return (
            <FormDescription className="flex items-center mt-2">
                <X />
                Link does not reference a valid image resource.
            </FormDescription>
        );
    }
};

export default TextValidationDescription;
