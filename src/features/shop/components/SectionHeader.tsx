import SearchInput from "@/components/SearchInput";
import { FilterIcon } from "lucide-react";
import React, { FC } from "react";
import useFilterQuery from "../hooks/useFilterQuery";
import useShopStore from "../store/shopStore";
import { debounce } from "@/lib/utils";

type SectionHeaderProps = {
    onOpenSidebar: () => void;
};

const SectionHeader: FC<SectionHeaderProps> = ({ onOpenSidebar }) => {
    const { setSearchQuery } = useFilterQuery();
    const { setSearchValues } = useShopStore();

    const handleSearchChange = debounce((value: string) => {
        setSearchValues(value);
        setSearchQuery(value);
    }, 1000);

    return (
        <header className="header flex items-center justify-between gap-6 overflow-hidden">
            <h2 className="header__title font-michroma text-2xl md:text-3xl xl:text-4xl">
                Notre Shop
            </h2>

            {/* Section Header */}
            <div className="header__actions flex space-x-3">
                <div
                    className="filter-btn bg-input flex h-9 items-center rounded-lg px-3 lg:hidden"
                    onClick={onOpenSidebar}
                >
                    <FilterIcon className="size-4" />
                </div>

                <SearchInput handleChange={handleSearchChange} />
            </div>
        </header>
    );
};

export default SectionHeader;
