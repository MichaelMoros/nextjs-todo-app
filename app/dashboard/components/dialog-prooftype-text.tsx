"use client";

import { ControllerRenderProps } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    TypeFormControlFields,
    TypeFormSetValueFields,
} from "@/app/types/types";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ProofType } from "@/app/enums/enums";

const items = [
    {
        id: "User Agreed",
        label: "I agree to update this item without any proof.",
    },
] as const;

const DialogUpdateProofText = ({
    control,
    setValue,
}: {
    control: any;
    setValue: any;
}) => {
    const handleCheckBoxChangePlus = (
        checked: CheckedState,
        field: ControllerRenderProps<
            {
                proofType: ProofType;
                proof: string;
                checkBoxProof: string[];
                note?: string | undefined;
            },
            "checkBoxProof"
        >,
        item: { id: string; label: string }
    ) => {
        if (checked) {
            setValue("proof", item.id);
        }

        if (!checked) {
            setValue("proof", "");
        }

        return checked
            ? field.onChange([...field.value, item.id])
            : field.onChange(field.value?.filter((value) => value !== item.id));
    };
    return (
        <FormField
            control={control}
            name="proof"
            render={() => (
                <FormItem>
                    <div className="mb-4">
                        <FormLabel className="text-base">
                            Confirmation
                        </FormLabel>
                        <FormDescription>
                            Check the box to continue
                        </FormDescription>
                    </div>
                    {items.map((item) => (
                        <FormField
                            key={item.id}
                            control={control}
                            name="checkBoxProof"
                            render={({ field }) => {
                                return (
                                    <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(
                                                    item.id
                                                )}
                                                onCheckedChange={(checked) =>
                                                    handleCheckBoxChangePlus(
                                                        checked,
                                                        field,
                                                        item
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item.label}
                                        </FormLabel>
                                    </FormItem>
                                );
                            }}
                        />
                    ))}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DialogUpdateProofText;
