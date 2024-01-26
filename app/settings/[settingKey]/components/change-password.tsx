"use client";
import FormFieldInputTypeText from "@/components/form-field-input-type-text";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import errorHelper from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ChangePasswordSchema = z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
});

const ChangePasswordForm = () => {
    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });

    const { mutateAsync: UpdatePasswordMutation } = useMutation({
        mutationFn: async (payload: any) =>
            await axios.patch("/api/user/change-password", payload),
        onSuccess: () => {
            toast({
                title: "Success",
                description: `Password Updated!`,
                duration: 1600,
            });
            form.reset();
        },
        onError: async (e: any) => {
            const error = errorHelper(e);
            const newPassword = form.getValues("newPassword");
            const oldPassword = form.getValues("oldPassword");

            form.reset({
                newPassword,
                oldPassword,
            });

            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });

    const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) =>
        await UpdatePasswordMutation(values);
    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Change Password
            </h1>
            <div className="mt-6">
                <Form {...form}>
                    <fieldset disabled={form.formState.isSubmitting}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormFieldInputTypeText
                                form={form}
                                fieldName="oldPassword"
                                fieldLabel="Enter old password"
                                type="password"
                            />

                            <div className="mt-6">
                                <FormFieldInputTypeText
                                    form={form}
                                    fieldName="newPassword"
                                    fieldLabel="Enter new password"
                                    type="password"
                                />
                            </div>

                            <div className="mt-6">
                                <SubmitButton
                                    className="w-full"
                                    buttonText="Update Password"
                                    isSubmitting={form.formState.isSubmitting}
                                />
                            </div>
                        </form>
                    </fieldset>
                </Form>
            </div>
        </>
    );
};

export default ChangePasswordForm;
