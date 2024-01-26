"use client";
import { Textarea } from "@/components/ui/textarea";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { TypeFormControlFields } from "@/app/types/types";

const DialogUpdateTextArea = ({
    control,
}: {
    control: TypeFormControlFields;
}) => {
    return (
        <FormField
            control={control}
            name="note"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Additional Note:</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="This field is optional."
                            className="resize-none"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DialogUpdateTextArea;
