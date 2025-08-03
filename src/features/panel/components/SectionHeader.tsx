import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { FC, ReactNode } from "react";

type SectionHeaderProps = {
    title: string;
    description?: string;
    titleButton?: JSX.Element;
    rightSide?: ReactNode;
};

const SectionHeader: FC<SectionHeaderProps> = ({
    title,
    description,
    rightSide,
    titleButton,
}): JSX.Element => {
    return (
        <header className="section-header flex items-center justify-between">
            <div className="heading">
                <h3
                    className={cn(
                        "heading__title font-michroma text-2xl",
                        titleButton && "flex items-center gap-3",
                    )}
                >
                    {titleButton} {title}
                </h3>

                {description?.length && (
                    <p className="heading__description text-muted-foreground mt-4">
                        {description}
                    </p>
                )}
            </div>

            <div className="section-header__right-children hidden sm:block">
                {rightSide}
            </div>
        </header>
    );
};

export default SectionHeader;
