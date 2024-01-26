"use client";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import DialogProofTypeLinkDescription from "./dialog-prooftype-link-description";

const DialogUpdateProofLink = ({ control }: { control: any }) => {
    const [didParseToUrl, setDidParseToUrl] = useState<null | boolean>(null);

    const handleTest = (a: any, field: any) => {
        try {
            new URL(a.target.value);
            setDidParseToUrl(true);
        } catch {
            setDidParseToUrl(false);
        }
        field.onChange(a.target.value);
    };

    return (
        <FormField
            control={control}
            name="proof"
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
                    <DialogProofTypeLinkDescription
                        didParseToUrl={didParseToUrl}
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DialogUpdateProofLink;
