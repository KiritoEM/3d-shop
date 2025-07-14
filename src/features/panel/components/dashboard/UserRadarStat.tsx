"use client";

import { FC, useEffect, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { MONTH_STRING } from "@/constants/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IUserStats } from "@/models/userModel";
import CardHeader from "./CardHeader";

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
                    value={`${filters.monthInterval[0]}_${filters.monthInterval[1]}`}
                >
                    <SelectTrigger className="w-fit gap-3">
                        <SelectValue>{`${MONTH_STRING[filters.monthInterval[0]]} - ${MONTH_STRING[filters.monthInterval[1]]}`}</SelectValue>
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
    count: {
        label: "Utilisateurs",
        color: "hsl(var(--chart-1))",
    },
};

type IMonthInterval = [number, number];

type UserRadarStatProps = {
    statsData: IUserStats[];
};

const UserRadarStat: FC<UserRadarStatProps> = ({ statsData }): JSX.Element => {
    const [monthInterval, setMonthInterval] = useState<IMonthInterval>([0, 5]); //by default january - july
    const [year, setYear] = useState<number>(new Date().getFullYear());

    if (!Array.isArray(statsData) || statsData.length === 0) {
        return (
            <article className="user-stats-card bg-gray rounded-lg p-6">
                <CardHeader title="Utilisateurs" rightSide={<></>} />
                <div className="flex h-[310px] items-center justify-center">
                    <p>Aucune donnée disponible</p>
                </div>
            </article>
        );
    }

    const radarData =
        statsData.length > 5
            ? statsData
                  .slice(monthInterval[0], monthInterval[1])
                  .map((item) => ({
                      ...item,
                      month: MONTH_STRING[Number(item.month) - 1],
                  }))
            : statsData.map((item) => ({
                  ...item,
                  month: MONTH_STRING[Number(item.month) - 1],
              }));

    const handleFilter = (filter: Partial<IFilter>) => {
        filter.monthInterval && setMonthInterval(filter.monthInterval);
        filter.year && setYear(filter.year);
    };

    useEffect(() => {
        if (new Date().getMonth() > monthInterval[1]) {
            setMonthInterval([6, 11]);
        } else {
            setMonthInterval([0, 5]);
        }
    }, [new Date().getMonth()]);

    return (
        <article className="user-stats-card bg-gray rounded-lg p-6">
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
                className="mx-auto mt-6 aspect-square max-h-[380px] w-full"
            >
                <RadarChart data={radarData}>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                    />
                    <PolarAngleAxis dataKey="month" />
                    <PolarGrid />
                    <Radar
                        dataKey="count"
                        fill="#109384"
                        stroke="#109384"
                        fillOpacity={0.6}
                        strokeWidth={2}
                        dot={{
                            r: 4,
                            fillOpacity: 1,
                            fill: "#109384",
                        }}
                    />
                </RadarChart>
            </ChartContainer>
        </article>
    );
};

export default UserRadarStat;
