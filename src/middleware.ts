import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AuthRoutes = ["/login", "/register"];
const commonPrivateRoutes = ["/dashboard", "/dashboard/change-password"];
const logoutRoutes = ["/dashboard/change-password"];
const roleBasedPrivateRoutes = {
    USER: [/^\/dashboard\/user/],
    ADMIN: [/^\/dashboard\/admin/],
};

type Role = keyof typeof roleBasedPrivateRoutes;

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (accessToken && commonPrivateRoutes.includes(pathname)) {
        return NextResponse.next();
    }
    if (logoutRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    let decodedData = null;
    if (accessToken) {
        decodedData = jwtDecode(accessToken) as any;
    }
    const role = decodedData?.role;

    if (role && roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        } else {
            if (
                !pathname.startsWith("/dashboard/user") &&
                !pathname.startsWith("/dashboard/admin")
            ) {
                return NextResponse.next();
            } else {
                return NextResponse.redirect(
                    new URL("/dashboard", request.url)
                );
            }
        }
    }

    return NextResponse.redirect(new URL("/dashboard", request.url));
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/dashboard/:page*",
        "/booking/:page*",
        "/flats/add-flat",
    ],
};
