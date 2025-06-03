export type Config3D = {
    rotation?: [number, number, number],
    position?: [number, number, number],
    scale?: number;
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    modelPath: string;
    groundColor: string;
    config3D?: Config3D;
    createdAt: string;
    updatedAt: string;
    category: string
}