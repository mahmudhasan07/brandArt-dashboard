// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "./utils/verifyJwt"; // Path may need adjusting

export async function middleware(request: NextRequest) {
  const homeRoute = `${request.nextUrl.origin}/login`;

  const adminRoutes = [
    "/",
    "/location-hour",
    "/offered-service",
    "/client-management",
    "/current-session",
    "/waiting-approval",
    "/next-queue",
    "/completed-appointment",
    "/canceled-appointment",
  ];

  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  try {
    const user = await verifyJwt(
      token,
      "1328ee71f68f8ad5bae374807d06632f1fa43a29ee9682cc64210777eeb88119"
    );

    const currentPath = request.nextUrl.pathname;

    // Block access to ADMIN-only pages if user is not ADMIN
    if (
      user.role !== "ADMIN" &&
      adminRoutes.some((route) => currentPath.startsWith(route))
    ) {
      return NextResponse.redirect(new URL(homeRoute, request.url));
    }

    return NextResponse.next(); // Valid token and access allowed
  } catch (error) {
    console.error("JWT validation error:", error);
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/location-hour",
    "/offered-service",
    "/client-management",
    "/current-session",
    "/waiting-approval",
    "/next-queue",
    "/completed-appointment",
    "/canceled-appointment",
  ],
};
