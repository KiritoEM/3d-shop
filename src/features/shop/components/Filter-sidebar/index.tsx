"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { FilterCard } from "./card";
import { CUSTOMISATION_FILTER_OPTS } from "@/constants/data/store-data";
import { DualRangeSlider } from '@/components/ui/ranger-slider';
import { FC, useState } from 'react';
import { ICategory } from "@/models/category.model";
import { normalizeStr } from "@/lib/utils";

type FilterSidebarProps = {
    categories: ICategory[];
    setCategory: (category: string) => void;
    activeCategory: string;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ categories, setCategory, activeCategory }): JSX.Element => {
    const [prices, setPrices] = useState<number[]>([0, 100000]);
    const allCategoriesLength = categories.map((category) => category.Product.flat()).length;

    return (
        <aside className="filter-bar hidden lg:block w-full max-w-[310px] xl:max-w-[325px] space-y-8 h-[calc(100vh-110px)] pb-8 fixed overflow-x-hidden scrollable-section overflow-y-auto">
            {/* Customisation card */}
            <FilterCard className="customisation-card" title="Customisation">
                <ul className="flex flex-col space-y-5">
                    {
                        CUSTOMISATION_FILTER_OPTS.map((opt, index) => (
                            <li key={index} className="customisation__opt w-full flex items-center justify-between">
                                <label htmlFor={`customisation-opt-${index}`}>{opt.label}</label>
                                <Checkbox id={`customisation-opt-${index}`} className="w-6 h-6 rounded-sm" />
                            </li>
                        ))
                    }
                </ul>
            </FilterCard>

            {/* Category card */}
            <FilterCard className="category-card" title="Catégories">
                <ul className="flex flex-col space-y-5">
                    <li className="category__item w-full flex items-center justify-between cursor-pointer" onClick={() => setCategory('tout')}>
                        <p className={activeCategory === "tout" ? "text-primary" : "text-foreground"}>Tout</p>
                        <div className="count px-3 py-1 rounded-xl bg-primary/10 text-primary text-sm">
                            <span>{allCategoriesLength}</span>
                        </div>
                    </li>

                    {
                        categories.map((category, index) => (
                            <li
                                key={index}
                                className="category__item w-full flex items-center justify-between cursor-pointer"
                                onClick={() => setCategory(normalizeStr(category.name))}
                            >
                                <p className={activeCategory.length && activeCategory === normalizeStr(category.name) ? "text-primary" : "text-foreground"}>{category.name}</p>
                                <div className="count px-3 py-1 rounded-xl bg-primary/10 text-primary text-sm">
                                    <span>{category.Product.length}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </FilterCard>

            {/* Price card */}
            <FilterCard className="category-card" title="Prix(Euros)">
                <div className="w-full pr-5 mt-16">
                    <DualRangeSlider
                        label={(value) => <span className="text-[13px]">{value}</span>}
                        value={prices}
                        onValueChange={setPrices}
                        className="font-michroma"
                        min={0}
                        max={100000}
                        step={50}
                    />
                </div>
            </FilterCard>
        </aside>
    );
};

export default FilterSidebar;