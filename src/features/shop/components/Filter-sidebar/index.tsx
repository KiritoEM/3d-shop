"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { FilterCard } from "./card";
import { CUSTOMISATION_FILTER_OPTS } from "@/constants/data/store-data";
import { CategoryMockData } from "@/__mock__/store-mock";
import { DualRangeSlider } from '@/components/ui/ranger-slider';
import { useState } from 'react';

const FilterSidebar = (): JSX.Element => {
    const [values, setValues] = useState<number[]>([0, 100000]);
    return (
        <aside className="w-full max-w-[340px] space-y-8 h-[calc(100vh-120px)] pb-8 fixed overflow-x-hidden scrollable-section overflow-y-auto">
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
                    {
                        CategoryMockData.map((category, index) => (
                            <li key={index} className="category__item w-full flex items-center justify-between cursor-pointer">
                                <p>{category.name}</p>
                                <div className="count px-3 py-1 rounded-xl bg-primary/10 text-primary text-sm">
                                    <span>{category.count}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </FilterCard>

            {/* Price card */}
            <FilterCard className="category-card" title="Prix(Ar)">
                <div className="w-full pr-5 mt-16">
                    <DualRangeSlider
                        label={(value) => <span className="text-[13px]">{value}</span>}
                        value={values}
                        onValueChange={setValues}
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