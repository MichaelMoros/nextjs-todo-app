"use client";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import errorHelper from "@/lib/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextInputWithImageValidation from "./text-validation";
import SubmitButton from "@/components/submit-button";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

const ChangeAvatarFileSchema = z.object({
    file: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, {
            message: "Max image size is 5mb",
        })
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
            message: "Only .jpeg .jpg .png and .webp formats are supported",
        }),
});

const ChangeAvatarLinkSchema = z.object({
    url: z.string(),
});

const ChangeAvatarForm = () => {
    const queryClient = useQueryClient();
    const fileForm = useForm<z.infer<typeof ChangeAvatarFileSchema>>({
        resolver: zodResolver(ChangeAvatarFileSchema),
        defaultValues: {
            file: undefined,
        },
    });

    const linkForm = useForm<z.infer<typeof ChangeAvatarLinkSchema>>({
        resolver: zodResolver(ChangeAvatarLinkSchema),
        defaultValues: {
            url: "",
        },
    });

    const { mutateAsync: UpdateAvatarMutation } = useMutation({
        mutationFn: async (payload: any) =>
            await axios.post("/api/user/avatar", payload),
        onSuccess: () => {
            setTimeout(async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["current-user"],
                });
            }, 200);
            toast({
                title: "Success",
                description: `Avatar Updated!`,
                duration: 1600,
            });

            fileForm.reset();
            linkForm.reset();
        },
        onError: async (e: any) => {
            const error = errorHelper(e);
            const fileFormValue = fileForm.getValues("file");
            const linkFormValue = linkForm.getValues("url");

            fileForm.reset({
                file: fileFormValue,
            });

            linkForm.reset({
                url: linkFormValue,
            });

            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });

    const onSubmit = async (values: any) => {
        const formData = new FormData();
        formData.append("file", values?.file ?? null);
        formData.append("url", values?.url ?? null);
        await UpdateAvatarMutation(formData);
    };

    return (
        <>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Change Avatar
            </h1>
            <div className="mt-6">
                <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                        <TabsTrigger value="link">Link</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload">
                        <Form {...fileForm}>
                            <fieldset
                                disabled={fileForm.formState.isSubmitting}
                            >
                                <form
                                    onSubmit={fileForm.handleSubmit(onSubmit)}
                                >
                                    <div className="mt-6">
                                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                            Upload File
                                        </h3>
                                        <FormField
                                            control={fileForm.control}
                                            name="file"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Image Requirements
                                                    </FormLabel>
                                                    <FormControl>
                                                        <>
                                                            <ul className="my-0 ml-5 list-disc [&>li]:mt-0 mb-2">
                                                                <li className="text-sm">
                                                                    It must be
                                                                    an image
                                                                    file
                                                                </li>
                                                                <li className="text-sm">
                                                                    File size
                                                                    must not
                                                                    exceed 5mb
                                                                </li>
                                                            </ul>
                                                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                                                <Input
                                                                    id="picture"
                                                                    type="file"
                                                                    className="w-full"
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        field.onChange(
                                                                            event
                                                                                .target
                                                                                .files &&
                                                                                event
                                                                                    .target
                                                                                    .files[0]
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="mt-6">
                                            <SubmitButton
                                                className="w-full"
                                                buttonText="Update Avatar"
                                                isSubmitting={
                                                    fileForm.formState
                                                        .isSubmitting
                                                }
                                            />
                                        </div>
                                    </div>
                                </form>
                            </fieldset>
                        </Form>
                    </TabsContent>
                    <TabsContent value="link">
                        <Form {...linkForm}>
                            <fieldset
                                disabled={linkForm.formState.isSubmitting}
                            >
                                <form
                                    onSubmit={linkForm.handleSubmit(onSubmit)}
                                >
                                    <div className="mt-6">
                                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                            Enter Link
                                        </h3>

                                        <TextInputWithImageValidation
                                            control={linkForm.control}
                                            formField="url"
                                        />
                                        <div className="mt-6">
                                            <SubmitButton
                                                className="w-full"
                                                buttonText="Update Avatar"
                                                isSubmitting={
                                                    linkForm.formState
                                                        .isSubmitting
                                                }
                                            />
                                        </div>
                                    </div>
                                </form>
                            </fieldset>
                        </Form>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default ChangeAvatarForm;
