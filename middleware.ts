// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { setCookie } from "cookies-next";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;
  // get user token
  const token = request.cookies.get("token");
  const role = request.cookies.get("role")?.value;
  // If visiting the cart page, set a 'redirect_from' cookie
  if (url.pathname === "/students/cart") {
    const response = NextResponse.next();
    setCookie("redirect_from", "/students/cart", { path: "/" });
    return response;
  }

  const authPaths = [
    "/signup",
    "/login",
    "/registration",
    "/teacher-account-create",
    "/student-account-create",
    "/school-registration",
    "/school-admin-account-create",
  ];

  const profileCreatePaths = [
    "/create-profile",
    "/school-admin-profile-create",
    "/student-profile-create",
    "/teacher-profile-create",
  ];

  if (path.includes("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && authPaths.includes(path)) {
    if (role === "student") {
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    } else if (role === "teacher") {
      return NextResponse.redirect(new URL("/dashboard/teacher", request.url));
    } else if (role === "school_admin") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else {
      return NextResponse.redirect(new URL("/dashboard/user", request.url));
    }
  }

  if (role === "teacher") {
    if (
      path === "/dashboard" ||
      path === "/dashboard/admin" ||
      path === "/dashboard/student"
    ) {
      return NextResponse.redirect(new URL("/dashboard/teacher", request.url));
    }
  } else if (role === "student") {
    if (
      path === "/dashboard" ||
      path === "/dashboard/admin" ||
      path === "/dashboard/user" ||
      path === "/dashboard/teacher"
    ) {
      return NextResponse.redirect(new URL("/dashboard/student", request.url));
    }
  } else if (role === "school_admin") {
    if (
      path === "/dashboard" ||
      path === "/dashboard/teacher" ||
      path === "/dashboard/user" ||
      path === "/dashboard/student"
    ) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }
  } else if (role == "user") {
    if (
      path === "/dashboard/admin" ||
      path === "/dashboard/teacher" ||
      path === "/dashboard/student" ||
      path === "/dashboard"
    ) {
      return NextResponse.redirect(new URL("/dashboard/user", request.url));
    }
  }

  if (!token && profileCreatePaths.includes(path)) {
    return NextResponse.redirect(new URL("/registration", request.url));
  }

  return NextResponse.next();
}

// Apply the middleware to the specific paths
export const config = {
  matcher: [
    "/cart",
    "/dashboard",
    "/dashboard/student",
    "/dashboard/teacher",
    "/dashboard/admin",
    "/dashboard/user",
    "/signup",
    "/login",
    "/registration",
    "/teacher-account-create",
    "/teacher-profile-create",
    "/student-account-create",
    "/student-profile-create",
    "/school-registration",
    "/school-admin-account-create",
    "/school-admin-profile-create",
    "/create-profile",
    "/dashboard/:path*",
  ],
};
