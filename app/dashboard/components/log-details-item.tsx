import { ProofType, UserAction } from "@/app/enums/enums";
import { capitalizeFirstLetter, formatDateTime } from "@/lib/helper";
import Link from "next/link";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LogDetailsItem = ({
    id,
    createdAt,
    action,
    logSummary,
    note,
    proofType,
    proof,
}: {
    id: number;
    createdAt: string;
    action: UserAction;
    logSummary: string;
    note: string;
    proofType: ProofType;
    proof: string;
}) => {
    return (
        <Card className="mr-3 pt-3 mt-3">
            <CardContent>
                <p className="text-sm  font-bold mb-1">
                    Created At: {formatDateTime(createdAt)}
                </p>
                <p className="text-sm  font-bold mb-1">
                    Action: {capitalizeFirstLetter(action)}
                </p>
                <p className="text-sm text-wrap">
                    <b>Summary: </b> {logSummary}
                </p>
                {note ? (
                    <p className="text-sm text-wrap">
                        <b>Additional Note:</b> {note}
                    </p>
                ) : null}
                {proofType !== ProofType.Text && (
                    <Link
                        href={proof}
                        className="text-sm w-full"
                        target="_blank"
                    >
                        <Button className="w-full mt-2">Proof Link</Button>
                    </Link>
                )}
            </CardContent>
        </Card>
    );
};

export default LogDetailsItem;
