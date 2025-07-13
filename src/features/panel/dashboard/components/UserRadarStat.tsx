"use client";

import { FC, useLayoutEffect, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import CardHeader from "./CardHeader";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { userStatsMockData } from "@/__mock__/user-mock";
import { MONTH_STRING } from "@/constants/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type IFilter = {
    year: number;
    monthInterval: [number, number];
};

type RadarStatsActionsProps = {
    // years: number[];
    filters: IFilter;
    addFilters: (filter: Partial<IFilter>) => void;
};

const RadarStatsActions: FC<RadarStatsActionsProps> = ({
    // years,
    filters,
    addFilters,
}): JSX.Element => {
    console.log(filters.year);
    return (
        <div className="radar-action flex items-center gap-4">
            {/* <div className="radar-action__year-filter">
                <Select
                    onValueChange={(value) =>
                        addFilters({ year: Number(value) })
                    }
                >
                    <SelectTrigger className="w-fit gap-3">
                        <SelectValue placeholder={`${filters.year}`} />
                    </SelectTrigger>

                    <SelectContent>
                        {years
                            .filter((year) => year !== filters.year)
                            .map((year) => (
                                <SelectItem value={`${year}`}>
                                    {year}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div> */}

            <div className="radar-action__month-interval">
                <Select
                    onValueChange={(value) =>
                        addFilters({
                            monthInterval: [
                                Number(value.split("_")[0]),
                                Number(value.split("_")[1]),
                            ],
                        })
                    }
                >
                    <SelectTrigger className="w-fit gap-3">
                        <SelectValue
                            placeholder={`${MONTH_STRING[filters.monthInterval[0]]} - ${MONTH_STRING[filters.monthInterval[1] - 1]}`}
                        />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="0_6">Janvier - Juin</SelectItem>
                        <SelectItem value="7_12">Juillet - Décembre</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

const chartConfig = {
    users: {
        label: "Utilisateurs",
        color: "hsl(var(--chart-1))",
    },
};

type IMonthInterval = [number, number];

const UserRadarStat = (): JSX.Element => {
    const [monthInterval, setMonthInterval] = useState<IMonthInterval>([0, 5]); //by default january - july
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const radarData = userStatsMockData[new Date().getFullYear()]
        .slice(monthInterval[0], monthInterval[1])
        .map((item) => ({
            ...item,
            month: MONTH_STRING[Number(item.month) - 1],
        }));

    const handleFilter = (filter: Partial<IFilter>) => {
        filter.monthInterval && setMonthInterval(filter.monthInterval);
        filter.year && setYear(filter.year);
    };

    useLayoutEffect(() => {
        if (new Date().getMonth() > monthInterval[1]) {
            setMonthInterval([6, 11]);
        } else {
            setMonthInterval([0, 5]);
        }
    }, [new Date().getMonth()]);

    return (
        <article className="last-transactions-card bg-gray rounded-lg p-6">
            <CardHeader
                title="Utilisateurs"
                rightSide={
                    <RadarStatsActions
                        // years={[2024, 2023, 2025]}
                        filters={{ year, monthInterval }}
                        addFilters={handleFilter}
                    />
                }
            />

            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[380px] w-full"
            >
                <RadarChart data={radarData}>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />
                    <PolarAngleAxis dataKey="month" />
                    <PolarGrid />
                    <Radar
                        dataKey="users"
                        fill="#3b82f6"
                        stroke="#3b82f6"
                        fillOpacity={0.6}
                        strokeWidth={2}
                        dot={{
                            r: 4,
                            fillOpacity: 1,
                            fill: "#3b82f6",
                        }}
                    />
                </RadarChart>
            </ChartContainer>
        </article>
    );
};

export default UserRadarStat;
