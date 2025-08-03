import { fetchApi } from "@/lib/api-utils";
import { ICategory } from "@/models/categoryModel";

export const fetchCategories = async (): Promise<ICategory[]> => {
    const response = await fetchApi("/api/category");

    if (!response.ok) {
        throw new Error("Error when fetching all products categories");
    }

    return response.json();
};
