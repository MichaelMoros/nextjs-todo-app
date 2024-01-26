import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ProofType } from "@/app/enums/enums";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { DialogUpdateHabitStats } from "./dialog-update-stats";
import { Form } from "@/components/ui/form";

import DialogUpdateTextArea from "./dialog-update-textarea";
import { UpdateRoutineSchema } from "@/app/types/types";
import DialogUpdateSelect from "./dialog-update-select";
import DialogUpdateProofText from "./dialog-prooftype-text";
import DialogUpdateProofLink from "./dialog-prooftype-link";
import DialogProofImage from "./dialog-prooftype-image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import errorHelper from "@/lib/error";

const DialogUpdateHabit = ({
    id,
    routineName,
    nextTouch,
    lastTouch,
}: {
    id: number;
    routineName: string;
    nextTouch: string;
    lastTouch: string;
}) => {
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof UpdateRoutineSchema>>({
        resolver: zodResolver(UpdateRoutineSchema),
        defaultValues: {
            proofType: undefined,
            note: undefined,
            proof: "",
            checkBoxProof: [],
            file: null,
        },
    });

    const onSubmit = async (data: z.infer<typeof UpdateRoutineSchema>) => {
        const proofs: any = [data.file, data.proof, data.checkBoxProof].filter(
            (k) => !!k
        );

        const payload = new FormData();
        const actualFile = proofs[0] instanceof File ? data.file : null;

        payload.append("proofType", data.proofType as ProofType);
        payload.append("note", data.note ? data.note.toString() : "");

        if (actualFile !== null) {
            payload.append("file", actualFile, actualFile.name);
        }

        payload.append("proof", data.proof);
        await updateHabitStatus(payload);
    };

    const { mutateAsync: updateHabitStatus } = useMutation({
        mutationFn: async (payload: any) =>
            await axios.post(`/api/habits/` + id, payload),
        onSuccess: () => {
            setTimeout(async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["get-dashboard-data"],
                });
            }, 300);
            toast({
                title: "Success",
                description: `Habit Updated!`,
            });
        },
        onError: (e: any) => {
            const error = errorHelper(e);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
                duration: 1600,
            });

            const proofType = form.getValues("proofType");
            const note = form.getValues("note");
            const proof = form.getValues("proof");
            const checkBoxProof = form.getValues("checkBoxProof");
            const file = form.getValues("file");

            form.reset({
                proofType,
                note,
                proof,
                checkBoxProof,
                file,
            });
        },
    });

    const proofTypeWatchValue = form.watch("proofType");

    return (
        <DialogContent>
            <DialogHeader className="sticky">
                <DialogTitle className="mb-3">
                    Update Habit: {routineName}
                </DialogTitle>
            </DialogHeader>

            <DialogUpdateHabitStats
                lastTouch={lastTouch}
                nextTouch={nextTouch}
            />

            <Form {...form}>
                <fieldset disabled={form.formState.isSubmitting}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <DialogUpdateTextArea control={form.control} />
                        <DialogUpdateSelect
                            control={form.control}
                            setValue={form.setValue}
                        />

                        {proofTypeWatchValue === ProofType.Text && (
                            <DialogUpdateProofText
                                control={form.control}
                                setValue={form.setValue}
                            />
                        )}

                        {proofTypeWatchValue === ProofType.Link && (
                            <DialogUpdateProofLink control={form.control} />
                        )}

                        {proofTypeWatchValue === ProofType.Image && (
                            <DialogProofImage
                                control={form.control}
                                setValue={form.setValue}
                            />
                        )}
                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </fieldset>
            </Form>
        </DialogContent>
    );
};

export default DialogUpdateHabit;
