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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import errorHelper from "@/lib/error";
import FormFieldInputTypeText from "@/components/form-field-input-type-text";
import NavbarTest from "../navbar";
import SubmitButton from "@/components/submit-button";
import ControlledLink from "@/components/controlled-link";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const Login = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: any) => {
        await SignInMutation(values);
    };

    const { mutateAsync: SignInMutation } = useMutation<any>({
        mutationFn: async (payload: any) =>
            await axios.post("/api/login", payload),
        onSuccess: () => {
            alert("Success, you'll be redirected shortly");
            setTimeout(() => {
                router.replace("/dashboard");
            }, 1000);
        },
        onError: async (e: any) => {
            const error = errorHelper(e);
            const email = form.getValues("email");
            const password = form.getValues("password");

            form.reset({
                email,
                password,
            });

            form.setError("password", {
                message:
                    error.code === 500
                        ? "Something went wrong :/"
                        : error.code == 401
                        ? "Either username/password is incorrect"
                        : error.message,
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
                                    <CardTitle>Sign In</CardTitle>
                                    <CardDescription>
                                        Sign back in
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
                                            type="password"
                                            fieldLabel="Password"
                                        />
                                        <div className="mt-4">
                                            <SubmitButton
                                                className="w-full"
                                                buttonText="Sign In"
                                                isSubmitting={
                                                    form.formState.isSubmitting
                                                }
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <ControlledLink
                                        href="/sign-up"
                                        text="Not a member?"
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

export default Login;
