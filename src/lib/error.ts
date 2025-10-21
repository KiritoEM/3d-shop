export const createCustomError = (name: string, message: string): Error => {
    const error = new Error(message) as Error;
    error.name = name;

    return error;
};
