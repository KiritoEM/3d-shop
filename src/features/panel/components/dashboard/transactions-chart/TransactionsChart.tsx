"use client";

import { FC } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { MONTH_STRING } from "@/constants/constants";
import { transactionsStatsMock } from "@/__mock__/transactions-mock";
import { ITransactionStats } from "@/models/transactionModel";
import CardHeader from "../CardHeader";
import { useFilterData } from "../../../store/filteredData";
import EmptyChart from "../../EmptySection";
import ChartFilter from "./ChartFilter";

const chartConfig = {
    count: {
        label: "Transaction",
        color: "hsl(var(--chart-1))",
    },
};

type TransactionsChartProps = {
    statsData?: ITransactionStats[];
};

const TransactionsChart: FC<TransactionsChartProps> = ({
    statsData,
}): JSX.Element => {
    const { year, setYear } = useFilterData();

    if (!Array.isArray(statsData) || statsData.length === 0) {
        return <EmptyChart cardTitle="Stats transactions" />;
    }

    const chartData = statsData.map((item) => ({
        ...item,
        month: MONTH_STRING[Number(item.month)],
    }));

    const years = Object.keys(transactionsStatsMock).map((item) =>
        Number(item),
    );

    return (
        <article className="transactions-stats-transactions-card dark:bg-gray rounded-lg border p-6 dark:border-0">
            <CardHeader
                title="Stats transactions"
                rightSide={
                    <ChartFilter
                        years={years}
                        selectedYear={year}
                        addYearFilter={(year: number) => setYear(year)}
                    />
                }
            />

            <div className="relative -left-8 mt-6">
                <ChartContainer config={chartConfig}>
                    <LineChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <YAxis
                            dataKey="count"
                            tickLine={false}
                            tickMargin={8}
                            // allowDataOverflow={true}
                        />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={12}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="count"
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
