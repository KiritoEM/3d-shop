"use client";

import { useLayoutEffect, useState } from "react";
import { AdminFacialRecognition, AdminInfo } from "@prisma/client";
import { getToken } from "@/lib/sessions/dbSession";
import { isDevelopment } from "@/lib/utils";
import { IDBSession } from "@/types";

const useDBSession = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<IDBSession | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useLayoutEffect(() => {
        const fetchDBSession = async () => {
            try {
                const token = await getToken();

                if (!token) {
                    throw new Error("No token found");
                }

                setToken(token);

                const response = await fetch(`/api/admin/session/${token}`);

                if (response.ok) {
                    const session = (await response.json()) as IDBSession;

                    setSession({
                        id: session.id,
                        username: session.username,
                        role: session.role,
                        image: session.image ?? "",
                    });
                }
            } catch (err) {
                isDevelopment && console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDBSession();
    }, []);

    return {
        token,
        isLoading,
        session,
    };
};

export default useDBSession;
