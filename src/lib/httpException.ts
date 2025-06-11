import { ERROR_CODE, SUCCESS_CODE } from "@/constants/constants";

export type IStatusCode = SUCCESS_CODE | ERROR_CODE;

class HttpException extends Error {
    public status: IStatusCode;
    public message: string;
    public error: any;

    constructor(message: string, statusCode: IStatusCode, error: any) {
        super(message);
        this.status = statusCode;
        this.message = message;
        this.error = error;
    }
}

export { HttpException }