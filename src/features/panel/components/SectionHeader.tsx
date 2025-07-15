import { FC, ReactNode } from "react";

type SectionHeaderProps = {
    title: string;
    rightSide?: ReactNode;
};

const SectionHeader: FC<SectionHeaderProps> = ({
    title,
    rightSide,
}): JSX.Element => {
    return (
        <header className="flex items-center justify-between">
            <h3 className="font-michroma text-4xl">{title}</h3>

            {rightSide}
        </header>
    );
};

export default SectionHeader;
