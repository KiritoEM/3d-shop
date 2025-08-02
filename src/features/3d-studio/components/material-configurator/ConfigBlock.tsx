import { FC, ReactNode } from "react";

type ConfigBlockProps = {
    title: string;
    children: ReactNode;
    name: string;
};

const ConfigBlock: FC<ConfigBlockProps> = ({
    name,
    title,
    children,
}): JSX.Element => {
    const BASE_CLASSNAME = `${name}_config`;
    return (
        <div className={BASE_CLASSNAME}>
            <header>
                <h6
                    className={`${BASE_CLASSNAME}__title font-michroma text-md`}
                >
                    {title}
                </h6>
            </header>

            <div className={`${BASE_CLASSNAME}__content mt-3`}>{children}</div>
        </div>
    );
};

export default ConfigBlock;
