import { NAV_DATA_AUTHENTICATED } from "@/constants/constants";
import { FC } from "react";

type AuthentificatedActionsProps = {
    data: typeof NAV_DATA_AUTHENTICATED;
    actions: (key: string) => void;
};

const AuthentificatedActions: FC<AuthentificatedActionsProps> = ({
    data,
    actions,
}): JSX.Element => {
    return (
        <div className="authentified-actions flex flex-col items-center gap-2">
            <hr className="authentified-actions__separator bg-border mt-5 h-[1px] w-full" />
            <div className="authentified-actions__items mt-3 w-full">
                <ul className="flex flex-col gap-5">
                    {data.map((item, index) => (
                        <li
                            key={index}
                            className="animated-label flex cursor-pointer items-center gap-3 text-base transition-opacity hover:opacity-70"
                            onClick={() => actions(item.key)}
                        >
                            <item.icon /> <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AuthentificatedActions;
