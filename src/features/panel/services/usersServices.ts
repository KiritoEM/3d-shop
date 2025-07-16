"use server";

import { getToken } from "@/lib/dbSession";

export const getPaginatedUsers = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            },
        },
    );

    return response.json();
};
