import { RoutineStatus } from "@/app/enums/enums";
import {
    capitalizeFirstLetter,
    formatDateTime,
    getLogUpdateStatus,
} from "@/lib/helper";
import React from "react";

export const LogDetailsStats = ({
    nextTouch,
    start,
    status,
    end,
    streak,
}: {
    nextTouch: string;
    start: string;
    status: RoutineStatus;
    end: string;
    streak: number;
}) => {
    return (
        <div>
            <p className="text-sm text-muted-foreground">
                Update Status: {getLogUpdateStatus(nextTouch)}
            </p>
            <p className="text-sm text-muted-foreground">
                Start: {formatDateTime(start)}
            </p>
            <p className="text-sm text-muted-foreground">
                End: {formatDateTime(end)}
            </p>
            <p className="text-sm text-muted-foreground">
                Next Touch: {formatDateTime(nextTouch)}
            </p>
            <p className="text-sm text-muted-foreground">
                Status: {capitalizeFirstLetter(status)}
            </p>
            <p className="text-sm text-muted-foreground">Streak: {streak}</p>
        </div>
    );
};
