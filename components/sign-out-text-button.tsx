import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const SignOutTextButton = () => {
    const router = useRouter();
    const { mutateAsync: SignOutMutation } = useMutation({
        mutationFn: async () => await axios.get("/api/logout"),
        onSuccess: () => {
            alert("Logout Success");
            router.push("/");
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error.message,
            });
        },
    });
    return <p onClick={() => SignOutMutation()}>Sign Out</p>;
};

export default SignOutTextButton;
