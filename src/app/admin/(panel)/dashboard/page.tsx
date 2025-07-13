import { transactionsMockData } from "@/__mock__/transactions-mock";
import { UsersMockData } from "@/__mock__/user-mock";
import GridSection from "@/features/panel/dashboard/components/GridSection";
import StatisticsSection from "@/features/panel/dashboard/components/StatisticsSection";

const Dashboard = (): JSX.Element => {
    return (
        <section className="dashboard mt-8">
            <StatisticsSection
                statistics={{
                    users: UsersMockData.length,
                    products: 10,
                    transactions: transactionsMockData.length,
                }}
            />

            <GridSection />
        </section>
    );
};

export default Dashboard;
