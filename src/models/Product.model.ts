export type Config3D = {
    rotation: [number, number, number];
    scale: number;
    position: [number, number, number]
}

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    modelPath: string;
    groundColor: string;
    config3D?: Partial<Config3D>;
}