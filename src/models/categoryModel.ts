import { IProduct } from "./productModel";

export interface ICategory {
    id: number;
    name: string;
    products: IProduct[];
}