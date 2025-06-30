import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/admin")) {
        const cookie = request.cookies.get("session_id");
        const sessionToken = cookie?.value;

        if (!sessionToken) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        const response = await fetch(
            `${request.nextUrl.origin}/api/admin_session`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: sessionToken }),
            },
        );

        if (!response.ok) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        const data = await response.json();

        let expiresTime: number;
        if (typeof data.expires === "string") {
            expiresTime = new Date(data.expires).getTime();
        } else {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        const isTokenExpired = Date.now() > expiresTime;

        if (isTokenExpired) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
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
