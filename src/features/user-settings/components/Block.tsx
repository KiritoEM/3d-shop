import { FC, ReactNode } from "react";

type BlockProps = {
    title: string;
    subtitle?: string;
    children: ReactNode;
};

const Block: FC<BlockProps> = ({ title, subtitle, children }): JSX.Element => {
    return (
        <div className="page-block">
            <header className="page-block__header">
                <h5 className="text-2xl">{title}</h5>
                {subtitle && (
                    <p className="text-muted-foreground mt-2">{subtitle}</p>
                )}
            </header>

            <div className="page-block__content mt-4 text-sm">{children}</div>
        </div>
    );
};

export default Block;
