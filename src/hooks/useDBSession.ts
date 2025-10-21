"use client";

import { useLayoutEffect, useState } from "react";
import { getToken } from "@/lib/sessions/dbSession";
import { isDevelopment } from "@/lib/utils";
import { IDBSession } from "@/types";
import { fetchApi } from "@/lib/api-utils";

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

                const response = await fetchApi(`/api/admin/session/${token}`);

                if (response.ok) {
                    const session = (await response.json()) as IDBSession;

                    setSession({
                        id: session.id,
                        username: session.username,
                        role: session.role,
                        image: session.image ?? "",
                        adminId: session.adminId,
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
