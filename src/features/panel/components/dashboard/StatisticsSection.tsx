import { FC } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATISTICS_CARD_DATA } from "@/data/panel-data";
import { cn } from "@/lib/utils";
import { IStatisticCard } from "@/constants/types";

const StatisticCard: FC<IStatisticCard> = ({
    badgeBg,
    icon,
    label,
    statistic,
    iconClass,
}): JSX.Element => {
    return (
        <article className="statistic-card bg-gray relative flex w-full flex-col justify-between gap-8 rounded-lg p-6">
            <div
                className={cn(
                    "statistic-card__badge relative w-fit rounded-full p-2",
                )}
                style={{ backgroundColor: badgeBg }}
            >
                <Image
                    src={icon}
                    className={iconClass}
                    alt=""
                    width={28}
                    height={28}
                />
            </div>

            <div className="statistic-card__info">
                <p>{label}</p>
                <h2 className="font-michroma mt-2 text-3xl xl:text-4xl">
                    {statistic}
                </h2>
            </div>

            <Button
                variant="ghost"
                className="absolute right-5 top-5 cursor-pointer !px-0  !py-0"
            >
                <ArrowRightIcon className="size-6 -rotate-45 stroke-1 md:size-8" />
            </Button>
        </article>
    );
};

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
