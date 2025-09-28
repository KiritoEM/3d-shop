import React, { FC } from "react";
import { FilterCard } from "./card";
import { ICategory } from "@/models/categoryModel";
import { encodeId } from "@/lib/encodage";

type CategoryFilterCardProps = {
    activeCategory: string;
    categories: ICategory[];
    categoriesLoading: boolean;
    allCategoriesLength: number;
    onSelectCategory: (category: string) => void;
};

const CategoryFilterCard: FC<CategoryFilterCardProps> = ({
    activeCategory,
    categories,
    categoriesLoading,
    allCategoriesLength,
    onSelectCategory,
}) => {
    return (
        <FilterCard className="category-card" title="Catégories">
            {categoriesLoading ? (
                <div className="spinner mx-auto mt-4 h-7 w-7 animate-spin rounded-full border-b-2 border-current"></div>
            ) : (
                <ul className="flex flex-col space-y-5">
                    <li
                        className="category__item flex w-full cursor-pointer items-center justify-between"
                        onClick={() => onSelectCategory("all")}
                    >
                        <p
                            className={
                                activeCategory === "all"
                                    ? "text-primary"
                                    : "text-foreground"
                            }
                        >
                            Tout
                        </p>
                        <div className="count bg-primary/10 text-primary rounded-xl px-3 py-1 text-sm">
                            <span>{allCategoriesLength}</span>
                        </div>
                    </li>

                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className="category__item flex w-full cursor-pointer items-center justify-between"
                            onClick={() =>
                                onSelectCategory(encodeId(category.id))
                            }
                        >
                            <p
                                className={
                                    activeCategory === category.id.toString()
                                        ? "text-primary"
                                        : "text-foreground"
                                }
                            >
                                {category.name}
                            </p>
                            <div className="count bg-primary/10 text-primary rounded-xl px-3 py-1 text-sm">
                                <span>{category.products.length}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </FilterCard>
    );
};

export default CategoryFilterCard;
