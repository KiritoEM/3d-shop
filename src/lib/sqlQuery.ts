export const statsSQLQuery = (
    table: string,
    year: number | null = null,
): string => {
    return `
        SELECT 
            EXTRACT(MONTH FROM "createdAt") AS month,
            COUNT(*) AS count
        FROM "${table}"
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

export const transactionsCountSQlQuery = (year: number): string => {
    return `
        SELECT
            COUNT(*) AS count
        FROM "transaction"
        WHERE EXTRACT(YEAR FROM "createdAt") = ${year}
    `;
};
