import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface FilterCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    children: ReactNode;
}

const FilterCard: FC<FilterCardProps> = ({ title, children, className, ...props }): JSX.Element => {
    return (
        <article className={cn(className, "p-6 rounded-xl border-gray border-1")}>
            <header>
                <h4 className="font-michroma text-2xl">{title}</h4>
            </header>

            <div className="filter-card__content mt-8">
                {children}
            </div>
        </article>
    )
}

export { FilterCard }