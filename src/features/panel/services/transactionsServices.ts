"use server";

import { getToken } from "@/lib/sessions/dbSession";

export const getPaginatedTransactions = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment`,
        {
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            },
        },
    );

    return response.json();
};
