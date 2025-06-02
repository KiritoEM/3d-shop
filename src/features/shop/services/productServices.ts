import { IProduct } from "@/models/Product.model";

export const fetchProducts = async (): Promise<IProduct> => {
    const response = await fetch("/api/products");

    if (!response.ok) {
        throw new Error("Error when fetching all products");
    }

    return response.json();
}