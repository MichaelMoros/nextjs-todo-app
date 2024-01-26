import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({
    buttonText,
    isSubmitting,
    className,
}: {
    buttonText?: string;
    isSubmitting: boolean;
    className?: string;
}) => {
    return (
        <Button type="submit" className={className ?? ""}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {buttonText ?? "Submit"}
        </Button>
    );
};

export default SubmitButton;
