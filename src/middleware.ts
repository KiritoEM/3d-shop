import { NextRequest, NextResponse } from "next/server";
import { fetchApi } from "./lib/api-utils";

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        const cookie = request.cookies.get("session_id");
        const sessionToken = cookie?.value;

        if (!sessionToken) {
            return pathname !== "/admin/login"
                ? NextResponse.redirect(new URL("/admin/login", request.url))
                : NextResponse.next();
        }

        const response = await fetchApi(
            `${request.nextUrl.origin}/api/admin/session/${sessionToken}`,
        );

        const data = await response.json();
        const expiresTime = new Date(data.expires).getTime();
        const isTokenExpired = Date.now() > expiresTime;

        if (!response.ok || isTokenExpired) {
            return pathname !== "/admin/login"
                ? NextResponse.redirect(new URL("/admin/login", request.url))
                : NextResponse.next();
        }

        if (!isTokenExpired && pathname === "/admin/login") {
            return NextResponse.redirect(
                new URL("/admin/dashboard", request.url),
            );
        }
    }

    return NextResponse.next();
};
export const config = {
    matcher: ["/admin/:path*"],
};
