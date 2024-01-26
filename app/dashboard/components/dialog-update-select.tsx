"use client";

import { ControllerRenderProps, FieldValues } from "react-hook-form";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    TypeFormControlFields,
    TypeFormSetValueFields,
} from "@/app/types/types";
import { ProofType } from "@/app/enums/enums";

const DialogUpdateSelect = ({
    control,
    setValue,
}: {
    control: any;
    setValue: TypeFormSetValueFields;
}) => {
    const handleSelectChangePlus = (
        value: string,
        field: ControllerRenderProps<FieldValues, "proofType">
    ) => {
        setValue("checkBoxProof", []);
        setValue("proof", "");
        setValue("file", null);
        field.onChange(value);
    };

    return (
        <FormField
            control={control}
            name="proofType"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Select Proof Type</FormLabel>
                    <Select
                        onValueChange={(val) =>
                            handleSelectChangePlus(val, field)
                        }
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Proof Type" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {Object.values(ProofType).map((item, index) => {
                                return (
                                    <SelectItem key={index} value={item}>
                                        {item}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DialogUpdateSelect;
