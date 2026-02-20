"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export function AuthSync() {
    const {user, isLoaded} = useUser();
    const syncUser = useMutation(api.users.syncUser);

    useEffect(()=>{
        if (!isLoaded) return;

        if(!user) return

        syncUser();
    }, [user?.id])

    return null
}