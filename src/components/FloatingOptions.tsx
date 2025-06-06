import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import Cart from "@/features/cart/components";

const FloatingOptions = (): JSX.Element => {
    return (
        <div className={
            cn(
                "fixed z-50 bottom-6 lg:bottom-8 right-6 lg:right-8 transition-all duration-400 flex flex-col space-y-6",
            )
        }>
            <Cart />
            <ThemeToggle />
        </div>
    );
};

export default FloatingOptions;