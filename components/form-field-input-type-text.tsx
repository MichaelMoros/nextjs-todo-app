import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const FormFieldInputTypeText = ({
    form,
    fieldName,
    fieldLabel,
    type = "text",
}: {
    form: any;
    fieldName: string;
    fieldLabel: string;
    type?: "text" | "password" | "number";
}) => {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{fieldLabel}</FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder={fieldLabel}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldInputTypeText;
