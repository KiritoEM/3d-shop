import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface FilterCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    children: ReactNode;
}

const FilterCard: FC<FilterCardProps> = ({ title, children, className, ...props }): JSX.Element => {
    return (
        <article className={cn("filter-card p-6 rounded-xl border-gray border-1", className)}>
            <header>
                <h4 className="font-michroma text-2xl">{title}</h4>
            </header>

            <div className="filter-card__content mt-6">
                {children}
            </div>
        </article>
    )
}

export { FilterCard }