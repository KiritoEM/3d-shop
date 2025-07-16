"use client";

import { getToken } from "@/lib/dbSession";
import { isDevelopment } from "@/lib/utils";
import { AdminFacialRecognition, AdminInfo } from "@prisma/client";
import { useLayoutEffect, useState } from "react";

export type ISession = Pick<AdminInfo, "id" | "username" | "role"> & {
    image?: string;
};

const useDBSession = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [session, setSession] = useState<ISession | null>(null);
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
                    const adminInfo = (await response.json())
                        .admin as AdminInfo & {
                        adminFacial: AdminFacialRecognition;
                    };

                    setSession({
                        id: adminInfo.id,
                        username: adminInfo.username,
                        role: adminInfo.role,
                        image: adminInfo.adminFacial.image ?? null,
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
