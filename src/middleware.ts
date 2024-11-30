import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;
  const cookiesStore = cookies();
  const xtr = cookiesStore.get("xtr")?.value;
  if (url.includes("auth")) {
    if (xtr) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (!xtr) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/users/:path*",
    "/settiings/:path*",
    "/products/:path*",
    "/orders/:path*",
    "/:path"
  ],
};
