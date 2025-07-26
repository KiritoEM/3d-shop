import { NextResponse } from "next/server";
import { IDBSession } from "@/types";
import { isSuperAdmin } from "./utils";

export const isTokenExpired = (expires: number): boolean => {
    return Date.now() > expires;
};

export const unauthorizedResponse = (message: string): NextResponse => {
    return NextResponse.json({ message }, { status: 401 });
};

export const checkIsSuperadmin = (session: IDBSession): Promise<IDBSession> => {
    return new Promise((resolve, reject) => {
        if (!session.role || !isSuperAdmin(session.role)) {
            reject(new Error("Superadmin access required"));
        }
        resolve(session);
    });
};
