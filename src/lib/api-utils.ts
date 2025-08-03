import { NextResponse } from "next/server";
import { IDBSession } from "@/types";
import { isServer } from "./utils";

type RequestOptions = Partial<{
    method: "GET" | "PUT" | "DELETE" | "POST" | "PATCH";
    headers: Record<string, string>;
    body: any;
    cookie: string;
    params: Record<string, string | number | boolean | undefined | null>;
    cache: RequestCache;
    next: NextFetchRequestConfig;
    credentials: RequestCredentials;
}>;

const buildURLWithParams = (
    url: string,
    params: RequestOptions["params"],
): string => {
    if (!params) return url;

    const filteredParams = Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null,
    );

    if (Object.keys(filteredParams).length === 0) return url;

    const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>,
    ).toString();

    return `${url}?${queryString}`;
};

export const getServerCookies = async (): Promise<string> => {
    if (!isServer) return "";

    try {
        const { cookies } = await import("next/headers");
        const cookiesStore = await cookies();
        return cookiesStore
            .getAll()
            .map((c) => `${c.name}=${c.value}`)
            .join("; ");
    } catch (err) {
        console.error("Error when fetching cookies: ", err);
        return "";
    }
};

export const fetchApi = async (
    url: string,
    options: RequestOptions = {},
    serverUrl: string = process.env.API_URL as string,
): Promise<Response> => {
    const {
        method = "GET",
        headers = {},
        body = {},
        cookie,
        params,
        cache = "no-store",
        next,
        credentials,
    } = options;

    //get server header cookies
    let cookieHeader = cookie;
    if (isServer && !cookie) {
        cookieHeader = await getServerCookies();
    }

    const prefixUrl = isServer && serverUrl.length ? `${serverUrl}${url}` : url;
    const fetchUrl = buildURLWithParams(prefixUrl, params);

    const response = await fetch(fetchUrl, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...headers,
            ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        ...(method !== "GET" && method !== "DELETE" && body
            ? { body: JSON.stringify(body) }
            : undefined),
        credentials,
        cache,
        next,
    });

    return response;
};

export const isSuperAdmin = (role: unknown): role is "SUPERADMIN" => {
    return role === "SUPERADMIN";
};

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
