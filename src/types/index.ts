export type IResponseType<T = null> = {
    message: string;
    status: "success" | "error";
    data?: T;
};
