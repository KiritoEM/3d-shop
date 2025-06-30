import bcrypt from "bcrypt";

export const hashData = async (
    text: string,
    salt: number = 10,
): Promise<string> => {
    return await bcrypt.hash(text, salt);
};

export const compareData = async (
    text: string,
    hashedText: string,
): Promise<boolean> => {
    return await bcrypt.compare(text, hashedText);
};
