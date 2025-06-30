import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import Cart from "@/features/cart/components";

const FloatingOptions = (): JSX.Element => {
    return (
        <div
            className={cn(
                "duration-400 fixed bottom-6 right-6 z-50 flex flex-col space-y-6 transition-all lg:bottom-8 lg:right-8",
            )}
        >
            <Cart />
            <ThemeToggle />
        </div>
    );
};

export default FloatingOptions;
