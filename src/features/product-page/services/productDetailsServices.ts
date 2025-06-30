import { IProduct } from "@/models/productModel";

export const fetchProductByCuid = async (cuid: string): Promise<IProduct> => {
    const response = await fetch(`/api/product/${cuid}`);

    if (!response.ok) {
        throw new Error("Error when fetching product by its cuid");
    }

    return response.json();
};
