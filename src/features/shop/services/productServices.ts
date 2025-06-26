import { IProduct } from "@/models/productModel";

export const fetchProducts = async (): Promise<IProduct[]> => {
    const response = await fetch("/api/products");

    if (!response.ok) {
        throw new Error("Error when fetching all products");
    }

    return response.json();
}