import { FC, ReactNode } from "react";

type BlockProps = {
    title: string;
    description?: string;
    children: ReactNode;
};

const Block: FC<BlockProps> = ({
    title,
    description,
    children,
}): JSX.Element => {
    return (
        <div className="page-block">
            <header className="page-block__header">
                <h5 className="text-2xl">{title}</h5>
                {description && (
                    <p className="text-muted-foreground mt-2">{description}</p>
                )}
            </header>

            <div className="page-block__content mt-6 text-sm sm:mt-8">
                {children}
            </div>
        </div>
    );
};

export default Block;
