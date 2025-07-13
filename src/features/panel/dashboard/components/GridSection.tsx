import { transactionsMockData } from "@/__mock__/transactions-mock";
import LastTransactions from "./LastTransactions";
import UserRadarStat from "./UserRadarStat";

const GridSection = (): JSX.Element => {
    return (
        <div className="mt-8 grid grid-cols-2 gap-5">
            <div className="column-1 flex flex-col gap-5">
                <LastTransactions
                    transactionsData={transactionsMockData.slice(0, 5)}
                />
            </div>

            <div className="column-2 flex flex-col gap-5">
                <UserRadarStat />
            </div>
        </div>
    );
};

export default GridSection;
