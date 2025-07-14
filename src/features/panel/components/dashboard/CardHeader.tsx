import { FC, ReactNode } from "react";

type CardHeaderProps = {
    title: string;
    rightSide: ReactNode;
};

const CardHeader: FC<CardHeaderProps> = ({ title, rightSide }): JSX.Element => {
    return (
        <header className="flex items-center justify-between gap-8">
            <h5 className="font-michroma text-xl">{title}</h5>

            {rightSide}
        </header>
    );
};

export default CardHeader;
