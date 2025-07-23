"use server";

import { getToken } from "@/lib/sessions/dbSession";

export const getPaginatedUsers = async (skip: number) => {
    console.log(await getToken());
    const response = await fetch(
        `${process.env.API_URL}/api/users?pagination_count=10&pagination_skip=${skip}`,
        {
            headers: {
                Authorization: `Bearer ${await getToken()}`,
            },
        },
    );

    return response.json();
};
