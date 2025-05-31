import { FilterCard } from "./card";

const FilterSidebar = (): JSX.Element => {
    return (
        <aside className="w-full max-w-[360px]">
            <FilterCard title="Customisation">
                <div></div>
            </FilterCard>
        </aside>
    );
};

export default FilterSidebar;