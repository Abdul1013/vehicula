import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { logger } from "../../../../lib/logger";

export async function GET(request) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      logger.warn("No auth_token found in check-session");
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    logger.info("Token verified in check-session", {
      userId: payload.userId,
      mustChangePassword: payload.mustChangePassword,
    });

    return NextResponse.json({
      user: {
        userId: payload.userId,
        role: payload.role,
        mustChangePassword: payload.mustChangePassword,
      },
    }, { status: 200 });
  } catch (error) {
    logger.error("Error verifying token in check-session", {
      error: error.message,
    });
    return NextResponse.json({ user: null }, { status: 200 });
  }
}