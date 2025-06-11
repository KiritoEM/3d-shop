import bcrypt from "bcrypt";

export const hashData = (text: string, salt: number = 10) => {
    return bcrypt.hash(text, salt);
}

export const compareData = (text: string, hashedText: string) => {
    return bcrypt.compare(text, hashedText);
}
