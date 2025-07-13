"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { FC } from "react";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import CardHeader from "./CardHeader";
import { ITransactionStats } from "@/models/transactionModel";
import { MONTH_STRING } from "@/constants/constants";

const chartConfig = {
    transaction: {
        label: "Transaction",
        color: "hsl(var(--chart-1))",
    },
};

type TransactionsChartProps = {
    statsData: ITransactionStats[];
};

const TransactionsChart: FC<TransactionsChartProps> = ({
    statsData,
}): JSX.Element => {
    const chartData = statsData.map((item) => ({
        ...item,
        month: MONTH_STRING[Number(item.month)],
    }));
    return (
        <article className="last-transactions-card bg-gray rounded-lg p-6">
            <CardHeader title="Stats transactions" rightSide={<></>} />

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
