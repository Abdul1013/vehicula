import { NextResponse } from "next/server";
import { logger } from "../../../../lib/logger";

export async function POST(request) {
  try {
    logger.info("Logout request received");
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );
    response.cookies.set({
      name: "auth_token",
      value: "",
      httpOnly: false, // Match /api/auth/login setting
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/",
    });
    logger.info("auth_token cookie cleared");
    return response;
  } catch (error) {
    logger.error("Logout error", { error: error.message, stack: error.stack });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
