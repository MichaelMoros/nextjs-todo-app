import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { LogDetailsStats } from "./log-details-stats";
import { LogDetailsContainer } from "./log-details-container";
import LogDetailsItem from "./log-details-item";
import { Habit } from "@/app/types/types";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const LogDetailsDialogContent = ({
    logData,
    close,
}: {
    logData: Habit;
    close: () => void;
}) => {
    return (
        <DialogContent>
            <DialogHeader className="sticky">
                <DialogTitle className="mb-3">
                    Log History of {logData.routine}
                </DialogTitle>
            </DialogHeader>

            <LogDetailsStats
                streak={logData.streak}
                nextTouch={logData.nextTouch}
                start={logData.start}
                status={logData.status}
                end={logData.end}
            />

            <LogDetailsContainer>
                {logData.logs.map((item) => (
                    <LogDetailsItem
                        key={item.id}
                        id={item.id}
                        createdAt={item.createdAt}
                        action={item.action}
                        logSummary={item.logSummary}
                        note={item.note}
                        proofType={item.proofType}
                        proof={item.proof}
                    />
                ))}
            </LogDetailsContainer>

            <DialogFooter>
                <Button onClick={close}>Close</Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default LogDetailsDialogContent;
