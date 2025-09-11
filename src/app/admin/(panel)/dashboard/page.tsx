import GridSection from "@/features/panel/components/dashboard/GridSection";
import StatisticsSection from "@/features/panel/components/dashboard/statistics-section/StatisticsSection";
import { fetchApi } from "@/lib/api-utils";
import { getToken } from "@/lib/sessions/dbSession";

const Dashboard = async (): Promise<JSX.Element> => {
    const token = await getToken();
    const reqHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const statsResponse = await Promise.all([
        fetchApi("/api/users/count", {
            ...reqHeader,
        }),
        fetchApi("/api/payment/count", {
            ...reqHeader,
            params: {
                year: new Date().getFullYear(),
            },
        }),
        fetchApi("/api/products/count", {
            ...reqHeader,
        }),
    ]);

    const [usersStats, transactionsStats, productsStats] = await Promise.all([
        statsResponse[0].json(),
        statsResponse[1].json(),
        statsResponse[2].json(),
    ]);

    console.log(usersStats, transactionsStats, productsStats);

    return (
        <section className="dashboard mt-8">
            <StatisticsSection
                statistics={{
                    users: usersStats.count,
                    products: productsStats.count,
                    transactions: transactionsStats.count,
                }}
            />

            <GridSection token={token!} />
        </section>
    );
};

export default Dashboard;
