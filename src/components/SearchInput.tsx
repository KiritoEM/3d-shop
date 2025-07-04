import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { forwardRef } from "react";

interface SeachInputProps {
    handleChange: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SeachInputProps>(
    ({ handleChange }, ref) => {
        return (
            <div
                className="search-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input shadow-xs hidden h-9 w-fit min-w-0 items-center gap-3 rounded-md border bg-transparent px-2 py-1 text-sm outline-none transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:flex md:w-[280px] md:px-3 xl:h-10 xl:w-[300px] 2xl:w-[340px] "
                ref={ref}
            >
                <Search className="size-5" />
                <input
                    type="text"
                    className="hidden w-full outline-none md:block"
                    placeholder="Rechercher un produit..."
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e.target.value)
                    }
                />
            </div>
        );
    },
);

export default SearchInput;
