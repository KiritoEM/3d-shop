import { fetchApi } from "@/lib/api-utils";
import { IProduct } from "@/models/productModel";
import { Filters } from "../store/shopStore";

export const fetchProducts = async (options: {
    searchValue?: string;
    filters?: Filters;
}): Promise<{
    paginatedData: IProduct[];
    totalCount: number;
}> => {
    const response = await fetchApi("/api/products", {
        params: {
            search_value: options.searchValue,
            category_id: options.filters?.category,
            price_range: `${options.filters?.priceRange?.[0]}-${options.filters?.priceRange?.[1]}`,
        },
    });

    if (!response.ok) {
        throw new Error("Error when fetching all products");
    }

    return response.json();
};
