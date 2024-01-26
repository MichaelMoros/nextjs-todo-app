"use client";
import * as React from "react";

import { Form } from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import errorHelper from "@/lib/error";
import FormFieldInputTypeText from "@/components/form-field-input-type-text";
import NavbarTest from "../navbar";
import { toast } from "@/components/ui/use-toast";
import SubmitButton from "@/components/submit-button";
import ControlledLink from "@/components/controlled-link";

const ForgotPasswordSchema = z.object({
    email: z.string().email(),
});

const ForgotPassword = () => {
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: any) => await ResetPasswordMutation(values);

    const { mutateAsync: ResetPasswordMutation } = useMutation<any>({
        mutationFn: async (payload: any) =>
            await axios.post("/api/create-password-reset", payload),
        onSuccess: () => {
            toast({
                title: "Success",
                description:
                    "We've sent a password reset email to your address. Please check your inbox (including spam folder) and follow the instructions.",
                duration: 5000,
            });
            form.reset();
        },
        onError: async (e: any) => {
            const error = errorHelper(e);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });

            const email = form.getValues("email");
            form.reset({
                email,
            });
        },
    });

    return (
        <>
            <NavbarTest />
            <div className="container mx-auto h-screen flex items-center justify-center">
                <Form {...form}>
                    <fieldset disabled={form.formState.isSubmitting}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Card className="w-[450px]">
                                <CardHeader>
                                    <CardTitle>Forgot Password</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormFieldInputTypeText
                                        form={form}
                                        fieldName="email"
                                        fieldLabel="Email Address"
                                    />
                                    <div className="mt-4">
                                        <SubmitButton
                                            buttonText="Submit"
                                            className="w-full"
                                            isSubmitting={
                                                form.formState.isSubmitting
                                            }
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <ControlledLink
                                        href="/sign-up"
                                        text="Not a member?"
                                        disabled={form.formState.isSubmitting}
                                    />
                                    <ControlledLink
                                        href="/sign-in"
                                        text="Already a member?"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </CardFooter>
                            </Card>
                        </form>
                    </fieldset>
                </Form>
            </div>
        </>
    );
};

export default ForgotPassword;
