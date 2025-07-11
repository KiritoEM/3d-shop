import { transactionsMockData } from "@/__mock__/transactions-mock";
import { UsersMockData } from "@/__mock__/user-mock";
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

            <div className="mt-8 grid grid-cols-2 gap-5">
                <div className="column-1 flex flex-col gap-5"></div>

                <div className="column-2 flex flex-col gap-5"></div>
            </div>
        </section>
    );
};

export default Dashboard;
