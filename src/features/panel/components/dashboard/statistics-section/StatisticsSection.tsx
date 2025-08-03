import { FC } from "react";
import { STATISTICS_CARD_DATA } from "@/data/panel-data";
import StatisticCard from "./StatisticCard";

type StatisticsSectionProps = {
    statistics: {
        users: number;
        products: number;
        transactions: number;
    };
};

const StatisticsSection: FC<StatisticsSectionProps> = ({
    statistics,
}): JSX.Element => {
    return (
        <div className="dashboard__statistics flex flex-col place-content-center gap-5 sm:grid sm:grid-cols-3">
            <StatisticCard
                badgeBg={STATISTICS_CARD_DATA["users"].badgeBg}
                icon={STATISTICS_CARD_DATA["users"].icon}
                label={STATISTICS_CARD_DATA["users"].label}
                statistic={statistics.users}
            />

            <StatisticCard
                badgeBg={STATISTICS_CARD_DATA["product"].badgeBg}
                icon={STATISTICS_CARD_DATA["product"].icon}
                label={STATISTICS_CARD_DATA["product"].label}
                statistic={statistics.products}
            />

            <StatisticCard
                badgeBg={STATISTICS_CARD_DATA["transactions"].badgeBg}
                icon={STATISTICS_CARD_DATA["transactions"].icon}
                label={STATISTICS_CARD_DATA["transactions"].label}
                statistic={statistics.transactions}
            />
        </div>
    );
};

export default StatisticsSection;
