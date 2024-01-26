"use client";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const AlertDialogContentDelete = ({ id }: { id: number }) => {
    const queryClient = useQueryClient();
    const { mutateAsync: deleteHabitMutation } = useMutation({
        mutationFn: async () => await axios.delete("/api/habits/" + id),
        onSuccess: () => {
            setTimeout(async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["get-dashboard-data"],
                });
            }, 300);
            toast({
                title: "Success",
                description: `Routine with id: ${id} successfully deleted.`,
            });
        },
        onError: (error) => {
            setTimeout(async () => {
                await queryClient.invalidateQueries({
                    queryKey: ["get-dashboard-data"],
                    exact: true,
                });
            }, 300);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        },
    });

    return (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action will change status to delete and cannot be
                    undone?
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogTrigger asChild>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogTrigger>
                <AlertDialogAction onClick={() => deleteHabitMutation()}>
                    Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </>
    );
};

export default AlertDialogContentDelete;
