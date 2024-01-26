"use client";
import * as React from "react";

import { Form } from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import errorHelper from "@/lib/error";
import FormFieldInputTypeText from "@/components/form-field-input-type-text";
import NavbarTest from "../navbar";
import SubmitButton from "@/components/submit-button";
import ControlledLink from "@/components/controlled-link";

const SignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const SignUp = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
        await SignUpMutation(values);
    };

    const { mutateAsync: SignUpMutation } = useMutation({
        mutationFn: async (payload: any) =>
            await axios.post("/api/sign-up", payload),
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Created new user",
                duration: 1600,
            });
            setTimeout(() => {
                router.push("/sign-in");
            }, 300);
        },
        onError: (e: any) => {
            const error = errorHelper(e);
            const email = form.getValues("email");
            const password = form.getValues("password");

            form.reset({
                email,
                password,
            });

            const labelError = error.code === 409 ? "email" : "password";

            form.setError(labelError, {
                message:
                    error.code === 500
                        ? "Something went wrong :/"
                        : error.code == 409
                        ? "Email address already in-use"
                        : error.message,
            });
        },
    });

    return (
        <>
            <NavbarTest />
            <div className="container mx-auto min-h-screen flex items-center justify-center">
                <Form {...form}>
                    <fieldset disabled={form.formState.isSubmitting}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Card className="w-[450px]">
                                <CardHeader>
                                    <CardTitle>Sign Up</CardTitle>
                                    <CardDescription>
                                        Sign up to start creating awesome
                                        routines
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <FormFieldInputTypeText
                                        form={form}
                                        fieldName="email"
                                        fieldLabel="Email Address"
                                    />
                                    <div className="mt-4">
                                        <FormFieldInputTypeText
                                            form={form}
                                            fieldName="password"
                                            fieldLabel="Password"
                                            type="password"
                                        />
                                        <div className="mt-4">
                                            <SubmitButton
                                                buttonText="Sign Up"
                                                className="w-full"
                                                isSubmitting={
                                                    form.formState.isSubmitting
                                                }
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <ControlledLink
                                        href="/sign-in"
                                        text="Already have an account?"
                                        disabled={form.formState.isSubmitting}
                                    />
                                    <ControlledLink
                                        href="/forgot-password"
                                        text="Forgot Password?"
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

export default SignUp;
