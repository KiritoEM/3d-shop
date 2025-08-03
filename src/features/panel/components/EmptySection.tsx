import { FC } from "react";
import CardHeader from "./dashboard/CardHeader";
import { cn } from "@/lib/utils";

type EmptySectionProps = {
    cardTitle: string;
    contentClass?: string;
};

const EmptySection: FC<EmptySectionProps> = ({
    cardTitle,
    contentClass = "h-[310px]",
}): JSX.Element => {
    return (
        <article className="bg-gray rounded-lg p-6">
            <CardHeader title={cardTitle} rightSide={<></>} />
            <div
                className={cn("flex items-center justify-center", contentClass)}
            >
                <p>Aucune donnée disponible</p>
            </div>
        </article>
    );
};

export default EmptySection;
