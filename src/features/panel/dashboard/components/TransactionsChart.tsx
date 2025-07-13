"use client";

import { FC, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import CardHeader from "./CardHeader";
import { MONTH_STRING } from "@/constants/constants";
import { transactionsStatsMock } from "@/__mock__/transactions-mock";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type ChartStatsActionsProps = {
    years: number[];
    selectedYear: number;
    addYearFilter: (year: number) => void;
};

const ChartStatsActions: FC<ChartStatsActionsProps> = ({
    years,
    selectedYear,
    addYearFilter,
}): JSX.Element => {
    return (
        <div className="radar-action flex items-center gap-4">
            <div className="radar-action__year-filter">
                <Select
                    value={`${selectedYear}`}
                    onValueChange={(value) => addYearFilter(Number(value))}
                >
                    <SelectTrigger className="w-fit gap-3">
                        <SelectValue>{selectedYear}</SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                        {years
                            .filter((year) => year !== selectedYear)
                            .map((year) => (
                                <SelectItem key={year} value={`${year}`}>
                                    {year}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

const chartConfig = {
    transaction: {
        label: "Transaction",
        color: "hsl(var(--chart-1))",
    },
};

const TransactionsChart = (): JSX.Element => {
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const chartData = transactionsStatsMock[year].map((item) => ({
        ...item,
        month: MONTH_STRING[Number(item.month)],
    }));

    const years = Object.keys(transactionsStatsMock).map((item) =>
        Number(item),
    );

    return (
        <article className="transactions-stats-transactions-card bg-gray rounded-lg p-6">
            <CardHeader
                title="Stats transactions"
                rightSide={
                    <ChartStatsActions
                        years={years}
                        selectedYear={year}
                        addYearFilter={(year: number) => setYear(year)}
                    />
                }
            />

            <div className="mt-6">
                <ChartContainer config={chartConfig}>
                    <LineChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={12}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            dataKey="transaction"
                            tickLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="transaction"
                            type="natural"
                            stroke="#109384"
                            strokeWidth={2}
                            dot={{
                                fill: "#109384",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </div>
        </article>
    );
};

export default TransactionsChart;
