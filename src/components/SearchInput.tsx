import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SeachInputProps {
    handleChange: (value: string) => void
}

const SearchInput = forwardRef<HTMLInputElement, SeachInputProps>(({ handleChange }, ref) => {
    return (
        <div className={
            cn(
                "search-input max-w-[300px] flex items-center gap-3",
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            )
        }
            ref={ref}
        >
            <Search className="size-5" />
            <input
                type="text"
                className="outline-none w-full"
                placeholder="Rechercher un produit..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
            />
        </div>
    );
});

export default SearchInput;
