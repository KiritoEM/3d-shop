export const getUsersGroupbyMonth = async (token: string) => {
    const response = await fetch(
        `/api/users/get_stats?year=${new Date().getFullYear()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.json();
};

export const getTransactionsGroupbyMonth = async (
    token: string,
    year: number = new Date().getFullYear(),
) => {
    const response = await fetch(`/api/payment/get_stats?year=${year}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
};

export const getLastTransactions = async (
    token: string,
    pagination: number = 5,
) => {
    const response = await fetch(`/api/payment?pagination=${pagination}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
};

export const getLastProducts = async (token: string) => {
    const response = await fetch(`/api/products/recent`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.json();
};
