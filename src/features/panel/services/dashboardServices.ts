import { fetchApi } from "@/lib/api-utils";

export const getUsersGroupbyMonth = async (token: string) => {
    const response = await fetchApi("/api/users/get_stats", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            year: new Date().getFullYear(),
        },
    });

    return response.json();
};

export const getTransactionsGroupbyMonth = async (
    token: string,
    year: number = new Date().getFullYear(),
) => {
    const response = await fetchApi("/api/payment/get_stats", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            year,
        },
    });

    return response.json();
};

export const getLastTransactions = async (
    token: string,
    pagination: number = 5,
) => {
    const response = await fetchApi("/api/payment", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            pagination,
        },
    });

    return response.json();
};

export const getLastProducts = async (token: string) => {
    const response = await fetchApi("/api/products/recent", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
};
