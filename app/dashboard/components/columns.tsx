"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
    capitalizeFirstLetter,
    formatDate,
    formatDateTime,
} from "@/lib/helper";
import ActionsDropdownMenu from "./actions-dropdown-menu";
import { Habit } from "@/app/types/types";

export const columns: ColumnDef<Habit>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "routine",
        header: "Routine",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const statusRowValue = row.getValue("status") as string;
            const formattedStatus = capitalizeFirstLetter(statusRowValue);
            return formattedStatus;
        },
    },
    {
        accessorKey: "start",
        header: "Start",
        cell: ({ row }) => {
            const rowValue = row.getValue("start") as string;
            const formattedDate = formatDate(rowValue);
            return formattedDate;
        },
    },
    {
        accessorKey: "end",
        header: "End",
        cell: ({ row }) => {
            const rowValue = row.getValue("end") as string;
            const formattedDate = formatDate(rowValue);
            return formattedDate;
        },
    },
    {
        accessorKey: "lastTouch",
        header: "Last Touch",
        cell: ({ row }) => {
            const rowValue = row.getValue("lastTouch") as string;
            const formattedDate = formatDateTime(rowValue);
            return formattedDate;
        },
    },
    {
        accessorKey: "nextTouch",
        header: "Next Touch",
        cell: ({ row }) => {
            const rowValue = row.getValue("nextTouch") as string;
            const formattedDate = formatDateTime(rowValue);
            return formattedDate;
        },
    },
    {
        accessorKey: "streak",
        header: "Streak",
    },
    {
        accessorKey: "action",
        header: "Actions",
        cell: ({ row }) => {
            return <ActionsDropdownMenu data={row.original} />;
        },
    },
];
