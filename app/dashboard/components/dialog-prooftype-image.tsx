import { ProofType } from "@/app/enums/enums";
import {
    TypeFormControlFields,
    TypeFormSetValueFields,
} from "@/app/types/types";
import {
    FormField,
    FormLabel,
    FormControl,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";

const DialogProofImage = ({
    control,
    setValue,
}: {
    control: TypeFormControlFields;
    setValue: TypeFormSetValueFields;
}) => {
    const handleFileChange = (
        e: any,
        field: ControllerRenderProps<
            {
                proofType: ProofType;
                proof: string;
                checkBoxProof: string[];
                file: File | null;
                note?: string | undefined;
            },
            "file"
        >
    ) => {
        field.onChange(e.target.files[0]);
        setValue("proof", "File-Attached");
    };
    return (
        <FormField
            control={control}
            name="file"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <>
                            <ul className="my-0 ml-5 list-disc [&>li]:mt-0 mb-2 mt-6">
                                <li className="text-sm">
                                    It must be an image file
                                </li>
                                <li className="text-sm">
                                    File size must not exceed 5mb
                                </li>
                                <li className="text-sm">
                                    File name should not contain special
                                    characters except [., _] and space between 2
                                    valid characters
                                </li>
                            </ul>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Input
                                    id="picture"
                                    type="file"
                                    className="w-full"
                                    onChange={(e) => handleFileChange(e, field)}
                                />
                            </div>
                        </>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DialogProofImage;
