// src/middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { logger } from "./lib/logger";

export async function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  logger.info("Middleware triggered", {
    path: request.nextUrl.pathname,
    hasToken: !!token,
  });

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
      logger.info("Redirecting to /change-password due to mustChangePassword", {
        userId: payload.userId,
      });
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

export const config = {
  matcher: ["/dashboard_form", "/change-password"],
};
