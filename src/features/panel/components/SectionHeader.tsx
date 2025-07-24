import { FC, ReactNode } from "react";

type SectionHeaderProps = {
    title: string;
    description?: string;
    rightSide?: ReactNode;
};

const SectionHeader: FC<SectionHeaderProps> = ({
    title,
    description,
    rightSide,
}): JSX.Element => {
    return (
        <header className="section-header flex items-center justify-between">
            <div className="heading">
                <h3 className="heading__title font-michroma text-2xl sm:text-3xl xl:text-4xl">
                    {title}
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
