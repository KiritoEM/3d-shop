import jwt, { JwtPayload } from "jsonwebtoken";

export const createJWTToken = <T extends Record<string, any>>(
    secretKey: string,
    payload: T,
    expires: number = 30 * 24 * 60 * 60,
) => {
    return jwt.sign(payload, secretKey, {
        expiresIn: expires,
    });
};

export const decodeJWT = <T>(
    token: string,
    secretKey: string,
): JwtPayload & T => {
    console.log(secretKey);
    return jwt.verify(token, secretKey) as JwtPayload & T;
};
