export type Config3D = {
    rotation?: [number, number, number];
    position?: [number, number, number];
    scale?: number;
};

export type ColorCustomisation = {
    color: string;
    value: string;
    materials: Record<string, string>;
};

export type CustomisationConfigs = {
    colorCustomisation: ColorCustomisation[];
    defaultColor: string;
};

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
    cuid: string;
    category: {
        name: string;
    };
    customisationConfigs: CustomisationConfigs;
}
