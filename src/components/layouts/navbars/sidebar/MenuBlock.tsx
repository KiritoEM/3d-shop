import { FC, ReactNode } from "react";

type MenuBlockProps = {
    title: string;
    children: ReactNode;
    isClosed?: boolean;
};

export const MenuBlock: FC<MenuBlockProps> = ({
    children,
    title,
    isClosed = false,
}): JSX.Element => {
    return (
        <div className="menu-block">
            {!isClosed && (
                <header className="ml-2">
                    <p className="text-muted-foreground/80 text-sm">
                        {title.toUpperCase()}
                    </p>
                </header>
            )}

            <div className="menu-block__items mt-3 flex flex-col space-y-1">
                {children}
            </div>
        </div>
    );
};

export default MenuBlock;
