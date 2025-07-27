import { FC } from "react";

type MaterialsListProps = {
    icon: string;
    label: string;
};

const MaterialsConfigurator: FC<MaterialsListProps> = ({
    icon,
    label,
}): JSX.Element => {
    return (
        <div className="materials-list fixed bottom-8 right-8">
            <></>
        </div>
    );
};

export default MaterialsConfigurator;
