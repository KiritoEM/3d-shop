import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface FilterCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    children: ReactNode;
}

const FilterCard: FC<FilterCardProps> = ({ title, children, className, ...props }): JSX.Element => {
    return (
        <article className={cn(className, "p-0 lg:p-6 border-0 lg:border-1 rounded-xl border-gray")} {...props}>
            <header>
                <h4 className="font-michroma text-lg xl:text-xl">{title}</h4>
            </header>

            <div className="filter-card__content mt-6 xl:mt-8">
                {children}
            </div>
        </article>
    )
}

export { FilterCard }