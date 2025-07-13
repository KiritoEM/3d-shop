export const userStatsSQLQuery = (year: number | null = null): string => {
    return `
        SELECT 
            EXTRACT(MONTH FROM "createdAt") AS month,
            COUNT(*) AS count
        FROM "user"
        ${
            year
                ? `
                WHERE EXTRACT(YEAR FROM "createdAt") = ${year}
            `
                : ""
        }
        GROUP BY EXTRACT(MONTH FROM "createdAt")
        ORDER BY month DESC`;
};
