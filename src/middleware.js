import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { logger } from "./lib/logger";

export async function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  logger.info("Middleware triggered", {
    path: request.nextUrl.pathname,
    hasToken: !!token,
  });

  // Redirect logged-in users from /login and /register
  if (token && ["/login", "/register"].includes(request.nextUrl.pathname)) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      logger.info("Token verified in middleware", {
        userId: payload.userId,
        mustChangePassword: payload.mustChangePassword,
      });

      if (payload.mustChangePassword) {
        logger.info("Redirecting to /change-password", {
          userId: payload.userId,
        });
        return NextResponse.redirect(new URL("/change-password", request.url));
      }

      logger.info("Redirecting logged-in user to /dashboard_form", {
        userId: payload.userId,
      });
      return NextResponse.redirect(new URL("/dashboard_form", request.url));
    } catch (error) {
      logger.warn("Token verification failed", { error: error.message });
      // Proceed to /login or /register if token is invalid
    }
  }

  // Protect specific routes
  if (
    [
      "/dashboard_form",
      "/change-password",
      "/dl_page",
      "/dl_application_form",
    ].includes(request.nextUrl.pathname)
  ) {
    if (!token) {
      logger.warn("No auth_token found, redirecting to /login", {
        path: request.nextUrl.pathname,
      });
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      logger.info("Token verified", {
        userId: payload.userId,
        mustChangePassword: payload.mustChangePassword,
      });

      if (
        payload.mustChangePassword &&
        request.nextUrl.pathname !== "/change-password"
      ) {
        logger.info(
          "Redirecting to /change-password due to mustChangePassword",
          {
            userId: payload.userId,
          }
        );
        return NextResponse.redirect(new URL("/change-password", request.url));
      }
      logger.info("Proceeding to requested route", {
        path: request.nextUrl.pathname,
      });
      return NextResponse.next();
    } catch (error) {
      logger.warn("Token verification failed, redirecting to /login", {
        error: error.message,
      });
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard_form",
    "/change-password",
    "/dl_page",
    "/dl_application_form",
    "/login",
    "/register",
  ],
};
