import { ICategory } from "@/models/category.model";

export const fetchCategories = async (): Promise<ICategory[]> => {
    const response = await fetch("/api/category");

    if (!response.ok) {
        throw new Error("Error when fetching all products");
    }

    return response.json();
}