import { formatDateTime, getLogUpdateStatus } from "@/lib/helper";
import React from "react";

export const DialogUpdateHabitStats = ({
    lastTouch,
    nextTouch,
}: {
    lastTouch: string;
    nextTouch: string;
}) => {
    return (
        <div>
            <p className="text-sm text-muted-foreground">
                Last Touch: {formatDateTime(lastTouch)}
            </p>
            <p className="text-sm text-muted-foreground">
                Next Touch: {formatDateTime(nextTouch)}
            </p>
            <p className="text-sm text-muted-foreground">
                Update Status: {getLogUpdateStatus(nextTouch)}
            </p>
        </div>
    );
};
