import { NextRequest, NextResponse } from "next/server";

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

        const response = await fetch(
            `${request.nextUrl.origin}/api/admin/session`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: sessionToken }),
            },
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
