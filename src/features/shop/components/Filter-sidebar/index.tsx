import { Checkbox } from "@/components/ui/checkbox";
import { FilterCard } from "./card";
import { CUSTOMISATION_FILTER_OPTS } from "@/constants/data/store-data";

const FilterSidebar = (): JSX.Element => {
    return (
        <aside className="w-full max-w-[360px]">
            <FilterCard className="customisation-card" title="Customisation">
                <div className="flex flex-col space-y-5">
                    {
                        CUSTOMISATION_FILTER_OPTS.map((opt, index) => (
                            <div className="customisation__opt w-full flex items-center justify-between">
                                <label htmlFor={`customisation-opt-${index}`}>{opt.label}</label>
                                <Checkbox id={`customisation-opt-${index}`} className="w-6 h-6 rounded-sm" />
                            </div>
                        ))
                    }
                </div>
            </FilterCard>
        </aside>
    );
};

export default FilterSidebar;