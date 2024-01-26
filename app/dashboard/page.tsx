"use client";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import InformationComponent from "../../components/information-component";
import Spinner from "../../components/spinner";
import CreateNewRouteDialogContent from "./components/create-new-routine-dialog-content";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useState } from "react";
import UserDisplayName from "./components/user-header";
import { DashboardValidResponse, Habit } from "../types/types";
import NavbarTest from "../navbar";
import UnverifiedAccount from "@/components/unverified-account-wrapper";

const DemoPage = () => {
    const [showDialog, setShowDialog] = useState(false);
    const closeDialog = () => setShowDialog(false);
    const { data, isFetching, error } = useQuery<{
        data: DashboardValidResponse;
    }>({
        queryKey: ["get-dashboard-data"],
        queryFn: async () => await axios.get("/api/habits"),
    });

    if (isFetching && !data) return <Spinner />;

    if (!isFetching && !data && error)
        return (
            <InformationComponent
                header={"Something went wrong"}
                description={error.message}
                link={{
                    to: "/",
                    text: "Back To Home",
                }}
            />
        );

    if (!isFetching && data && !error) {
        return (
            <>
                <NavbarTest user={data.data.owner} />
                <UnverifiedAccount user={data.data.owner}>
                    <>
                        <div className="container mx-auto py-10">
                            <Dialog
                                open={showDialog}
                                onOpenChange={setShowDialog}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <UserDisplayName owner={data.data.owner} />
                                    <DialogTrigger asChild>
                                        <Button>Add New</Button>
                                    </DialogTrigger>
                                    <CreateNewRouteDialogContent
                                        closeDialog={closeDialog}
                                    />
                                </div>
                                <DataTable
                                    columns={columns}
                                    data={data.data.data}
                                />
                            </Dialog>
                        </div>
                    </>
                </UnverifiedAccount>
            </>
        );
    }
};

export default DemoPage;
