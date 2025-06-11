export type IResponseType<T> = {
    message: string;
    status: "success" | "error";
    data?: T
}