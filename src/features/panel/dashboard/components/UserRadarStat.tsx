import Link from "next/link";
import CardHeader from "./CardHeader";
import { ChartContainer } from "@/components/ui/chart";
import { RadarChart } from "recharts";
import { FC } from "react";

const chartConfig = {
    user: {
        label: "Utilisateurs",
        color: "hsl(var(--chart-1))",
    },
};

type UserRadarStatProps = {
    userStats: {};
};

const UserRadarStat: FC<UserRadarStatProps> = ({ userStats }): JSX.Element => {
    return (
        <article className="last-transactions-card bg-gray rounded-lg p-6">
            <CardHeader
                title="Utilisateurs"
                rightSide={
                    <Link
                        href=""
                        className="text-primary cursor-pointer text-sm hover:font-semibold"
                    >
                        Voir tout
                    </Link>
                }
            />

            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
            >
                <RadarChart></RadarChart>
            </ChartContainer>
        </article>
    );
};

export default UserRadarStat;
