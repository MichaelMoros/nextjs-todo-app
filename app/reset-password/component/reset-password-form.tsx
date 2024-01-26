"use client";
import * as React from "react";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import errorHelper from "@/lib/error";
import FormFieldInputTypeText from "@/components/form-field-input-type-text";
import { toast } from "@/components/ui/use-toast";
import InformationComponent from "@/components/information-component";
import SubmitButton from "@/components/submit-button";

const ForgotPasswordSchema = z
    .object({
        newPassword: z.string().min(6),
        confirmNewPassword: z.string().min(6),
    })
    .refine((schema) => schema.newPassword === schema.confirmNewPassword, {
        message: "Both passwords must match",
        path: ["confirmNewPassword"],
    });

const ResetPasswordForm = ({ token }: { token: string }) => {
    const [didResetPassword, setDidResetPassword] = React.useState(false);
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const onSubmit = async (values: any) => {
        await ResetPasswordMutation({ newPassword: values.newPassword });
    };

    const { mutateAsync: ResetPasswordMutation } = useMutation({
        mutationFn: async (payload: any) => {
            return await axios.post(
                "/api/reset-password?token=" + token,
                payload
            );
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Password successfully reset",
                duration: 2000,
            });

            form.reset();

            setTimeout(() => {
                setDidResetPassword(true);
            }, 1000);
        },
        onError: async (e: any) => {
            const error = errorHelper(e);
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });

            const newPassword = form.getValues("newPassword");
            const confirmNewPassword = form.getValues("confirmNewPassword");

            form.reset({
                newPassword,
                confirmNewPassword,
            });
        },
    });

    if (!didResetPassword) {
        return (
            <div className="container mx-auto h-screen flex items-center justify-center">
                <Form {...form}>
                    <fieldset disabled={form.formState.isSubmitting}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Card className="w-[450px]">
                                <CardHeader>
                                    <CardTitle>Reset Password</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormFieldInputTypeText
                                        form={form}
                                        fieldName="newPassword"
                                        fieldLabel="Enter New Password"
                                        type="password"
                                    />
                                    <div className="mt-4">
                                        <FormFieldInputTypeText
                                            form={form}
                                            fieldName="confirmNewPassword"
                                            fieldLabel="Confirm New Password"
                                            type="password"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <SubmitButton
                                            buttonText="Reset Password"
                                            className="w-full"
                                            isSubmitting={
                                                form.formState.isSubmitting
                                            }
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </form>
                    </fieldset>
                </Form>
            </div>
        );
    }

    if (didResetPassword) {
        return (
            <InformationComponent
                header={"Success"}
                description={"You successfully reset your password"}
                link={{
                    to: "/sign-in",
                    text: "Back to Sign-In",
                }}
            />
        );
    }
};

export default ResetPasswordForm;
