import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
export function middleware(request: NextRequest) {
  // const loginRoute = `${request.nextUrl.origin}/login`;
  const homeRoute = `${request.nextUrl.origin}/login`;
  // const dashboardRoute = `${request.nextUrl.origin}/dashboard`;
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

  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }
  const userInfo = jwtDecode(token as string);

  const currentPath = request.nextUrl.pathname;
  const currentTime = Math.floor(Date.now() / 1000);
  if (userInfo.exp && userInfo.exp < currentTime) {
    console.warn("Token has expired");
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  // // Redirect based on role and route
  if (
    "role" in userInfo &&
    userInfo?.role !== "ADMIN" &&
    adminRoutes.some((e) => currentPath.startsWith(e))
  ) {
    // Prevent ADMIN from accessing /services
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  // // Allow the request to proceed if the token exists
  return NextResponse.next();
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
  ], // Apply middleware to the /services route
};
