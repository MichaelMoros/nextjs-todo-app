"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";

import DialogUpdateHabit from "./dialog-update-habit";
import AlertDialogContentDelete from "./alert-dialog-content-delete";
import { useState } from "react";
import LogDetailsDialogContent from "./log-details-dialog-body";
import { Habit } from "@/app/types/types";
import { RoutineStatus } from "@/app/enums/enums";

enum ShowDialog {
    ShowUpdateForm = "Show Update Form",
    ShowHistory = "Show History",
}

const ActionsDropdownMenu = ({ data }: { data: Habit }) => {
    const [open, setOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<null | ShowDialog>();
    const showDialogA = () => setDialogContent(ShowDialog.ShowUpdateForm);
    const showDialogB = () => setDialogContent(ShowDialog.ShowHistory);
    const closeDialog = () => setOpen(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <AlertDialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Row Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {data.status !== RoutineStatus.Deleted && (
                            <DialogTrigger onClick={showDialogA} asChild>
                                <DropdownMenuItem>
                                    Update Status
                                </DropdownMenuItem>
                            </DialogTrigger>
                        )}

                        <DropdownMenuItem>
                            <DialogTrigger onClick={showDialogB}>
                                View Habit History
                            </DialogTrigger>
                        </DropdownMenuItem>

                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem>Delete Habit</DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu>

                {dialogContent === ShowDialog.ShowUpdateForm ? (
                    <DialogUpdateHabit
                        id={data.id}
                        routineName={data.routine}
                        nextTouch={data.nextTouch}
                        lastTouch={data.lastTouch}
                    />
                ) : dialogContent === ShowDialog.ShowHistory ? (
                    <LogDetailsDialogContent
                        logData={data}
                        close={closeDialog}
                    />
                ) : null}
                <AlertDialogContent>
                    <AlertDialogContentDelete id={data.id} />
                </AlertDialogContent>
            </AlertDialog>
        </Dialog>
    );
};

export default ActionsDropdownMenu;
