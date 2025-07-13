import { transactionsMockData } from "@/__mock__/transactions-mock";
import { UsersMockData } from "@/__mock__/user-mock";
import GridSection from "@/features/panel/dashboard/components/GridSection";
import StatisticsSection from "@/features/panel/dashboard/components/StatisticsSection";
import { getToken } from "@/lib/dbSession";

const Dashboard = async (): Promise<JSX.Element> => {
    const token = await getToken();
    const reqHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const statsResponse = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/count`, {
            ...reqHeader,
        }),
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/payment/count?year=${new Date().getFullYear()}`,
            {
                ...reqHeader,
            },
        ),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/count`, {
            ...reqHeader,
        }),
    ]);

    const [usersStats, transactionsStats, productsStats] = await Promise.all([
        statsResponse[0].json(),
        statsResponse[1].json(),
        statsResponse[2].json(),
    ]);

    return (
        <section className="dashboard mt-8">
            <StatisticsSection
                statistics={{
                    users: usersStats.count,
                    products: transactionsStats.count,
                    transactions: productsStats.count,
                }}
            />

            <GridSection />
        </section>
    );
};

export default Dashboard;
