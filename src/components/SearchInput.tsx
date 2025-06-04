import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SeachInputProps {
    handleChange: (value: string) => void
}

const SearchInput = forwardRef<HTMLInputElement, SeachInputProps>(({ handleChange }, ref) => {
    return (
        <div className="search-input w-fit md:w-[280px] xl:w-[300px] 2xl:w-[340px] hidden md:flex items-center gap-3 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 xl:h-10 min-w-0 rounded-md border bg-transparent px-2 md:px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 " ref={ref}>
            <Search className="size-5" />
            <input
                type="text"
                className="outline-none w-full hidden md:block"
                placeholder="Rechercher un produit..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
            />
        </div>
    );
});

export default SearchInput;
