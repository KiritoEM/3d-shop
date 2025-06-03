import { IProduct } from "./product.model";

export interface ICategory {
    id: number;
    name: string;
    Product: IProduct[];
}