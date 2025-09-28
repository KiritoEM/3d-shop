import Hashids from "hashids";

const hashids = new Hashids("BAZZAR_SECRET_KEY", 16);

export const encodeId = (id: number): string => {
    return hashids.encode(id);
};

export const decodeId = (encodedId: string): number => {
    const decoded = hashids.decode(encodedId);
    return decoded[0] as number;
};
