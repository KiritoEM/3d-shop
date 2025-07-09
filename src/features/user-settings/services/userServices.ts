"use server";

import { SessionUserWithId } from "../utilities/serverSessionUtilities";

export const fetchUserInfo = async (
    userSession: SessionUserWithId,
    token: string,
) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userSession.id}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        },
    );

    return response;
};
