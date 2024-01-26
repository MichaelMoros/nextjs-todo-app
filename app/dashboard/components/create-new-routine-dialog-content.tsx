"use client";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import FormSelectChildren from "./form-select-children";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { StartTime, UpdateInterval } from "../../enums/enums";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import SubmitButton from "@/components/submit-button";

const FormSchema = z.object({
    routine: z
        .string()
        .min(2, {
            message: "A description would be nice",
        })
        .max(255, {
            message: "Description must not be longer than 255 characters.",
        }),
    start: z.nativeEnum(StartTime),
    end: z.date({
        required_error: "End date is required",
    }),
    updateInterval: z.nativeEnum(UpdateInterval),
});

const CreateNewRouteDialogContent = ({
    closeDialog,
}: {
    closeDialog: () => void;
}) => {
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            routine: "",
            start: StartTime.Now,
            end: undefined,
            updateInterval: UpdateInterval.EveryTwentyFourHours,
        },
    });

    const { mutateAsync: addNewHabit } = useMutation({
        mutationFn: async (payload) => await axios.post("/api/habits", payload),
        onSuccess: () => {
            setTimeout(async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["get-dashboard-data"],
                });
            }, 500);
            form.reset();
            closeDialog();
            toast({
                title: "Success",
                description: `New Routine Added!`,
                duration: 1600,
            });
        },
        onError: (e) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: e.message,
                duration: 1600,
            });
            const routine = form.getValues("routine");
            const end = form.getValues("end");
            form.reset({
                routine,
                start: StartTime.Now,
                end,
                updateInterval: UpdateInterval.EveryTwentyFourHours,
            });
        },
    });

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        const formData: any = form.getValues();
        formData.start = new Date().toISOString();
        await addNewHabit(formData);
    }

    return (
        <DialogContent className="max-w-lg">
            <DialogHeader className="sticky">
                <DialogTitle className="mb-3">Create New Habit</DialogTitle>
            </DialogHeader>

            <Form {...form}>
                <fieldset disabled={form.formState.isSubmitting}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="routine"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Habit Name</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your habit/routine here"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="start"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Time:</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <FormSelectChildren
                                                name={"start-time"}
                                                options={Object.values(
                                                    StartTime
                                                )}
                                            />
                                        </FormControl>
                                    </Select>
                                    <FormDescription>
                                        {`Currently, it doesn't support future date requests`}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="end"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>End Date:</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal w-100",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            "PPP"
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date <
                                                        new Date(
                                                            new Date().setDate(
                                                                new Date().getDate() +
                                                                    1
                                                            )
                                                        ) ||
                                                    date <
                                                        new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>
                                        It only includes the date, time is set
                                        to 0
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="updateInterval"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Update Interval:</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <FormSelectChildren
                                                name={"update-interval"}
                                                options={Object.values(
                                                    UpdateInterval
                                                )}
                                            />
                                        </FormControl>
                                    </Select>
                                    <FormDescription>
                                        Currently, it only support daily
                                        updates.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <SubmitButton
                                className="w-full"
                                isSubmitting={form.formState.isSubmitting}
                            />
                        </DialogFooter>
                    </form>
                </fieldset>
            </Form>
        </DialogContent>
    );
};

export default CreateNewRouteDialogContent;
