"use client";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import TextValidationDescription from "./text-validation-feedback-description";

const TextInputWithImageValidation = ({
    control,
    formField,
}: {
    control: any;
    formField: string;
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isChecking, setIsChecking] = useState(false);
    const [errorText, setErrorText] = useState<null | string>(null);
    const [successText, setSuccessText] = useState<null | string>(null);

    const debouncedValidateLink = useCallback(
        debounce((value: string) => {
            setErrorText(null);
            setSuccessText(null);
            setIsChecking(true);

            const urlWithProtocol =
                value.startsWith("http://") || value.startsWith("https://")
                    ? value
                    : `http://${value}`;

            axios
                .head(urlWithProtocol)
                .then((response: any) => {
                    if (
                        !response.headers["content-type"].startsWith("image/")
                    ) {
                        setErrorText(
                            "Link is not a reference to an image resource."
                        );
                        setSuccessText(null);
                    } else {
                        setSuccessText("Looks good!");
                        setErrorText(null);
                    }
                })
                .catch((err) => {
                    setErrorText("Error: " + err.message);
                    setSuccessText(null);
                })
                .finally(() => {
                    setIsChecking(false);
                });
        }, 1000),
        []
    );

    useEffect(() => {
        debouncedValidateLink(inputValue);
    }, [inputValue, debouncedValidateLink]);

    const handleTest = (a: any, field: any) => {
        setInputValue(a.target.value);
        field.onChange(a);
    };

    return (
        <FormField
            control={control}
            name={formField}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Image Link</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Image Link"
                            {...field}
                            onChange={(e) => handleTest(e, field)}
                        />
                    </FormControl>
                    <TextValidationDescription
                        successText={successText}
                        errorText={errorText}
                        isChecking={isChecking}
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TextInputWithImageValidation;
