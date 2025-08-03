import { IStatisticCard } from "@/constants/types";
import { FC } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const StatisticCard: FC<IStatisticCard> = ({
    badgeBg,
    icon,
    label,
    statistic,
    iconClass,
}): JSX.Element => {
    return (
        <article className="statistic-card dark:bg-gray relative flex w-full flex-col justify-between gap-8 rounded-lg border p-6 dark:border-0">
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

export default StatisticCard;
