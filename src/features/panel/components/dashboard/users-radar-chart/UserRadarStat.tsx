"use client";

import { FC, useEffect, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { MONTH_STRING } from "@/constants/constants";
import { IUserStats } from "@/models/userModel";
import CardHeader from "../CardHeader";
import EmptyChart from "../../EmptySection";
import RadarFilter from "./RadarFilter";

export type IFilter = {
    monthInterval: [number, number];
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

    if (!Array.isArray(statsData) || statsData.length === 0) {
        return <EmptyChart cardTitle="Utilisateurs" />;
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
    };

    useEffect(() => {
        if (new Date().getMonth() > monthInterval[1]) {
            setMonthInterval([6, 11]);
        } else {
            setMonthInterval([0, 5]);
        }
    }, [new Date().getMonth()]);

    return (
        <article className="user-stats-card dark:bg-gray rounded-lg border p-6 dark:border-0">
            <CardHeader
                title="Utilisateurs"
                rightSide={
                    <RadarFilter
                        filters={{ monthInterval }}
                        addFilters={handleFilter}
                    />
                }
            />

            <ChartContainer
                config={chartConfig}
                className="!md:max-h-[380px] mx-auto mt-6 aspect-square !max-h-[280px] w-full"
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
