import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { logger } from "../../../lib/logger";
import { jwtVerify } from "jose";

export async function GET(request) {
  try {
    // Get auth_token from cookies
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      logger.warn("No auth_token provided in dl_services request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify JWT and get userId
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId;

    logger.info("Fetching driver’s license services for user", { userId });

    // Get user’s region from bk_repository
    const user = await prisma.bk_repository.findUnique({
      where: { bk_uid: BigInt(userId) },
      select: { bk_default_region: true },
    });

    if (!user) {
      logger.warn("User not found", { userId });
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userRegion = user.bk_default_region;

    // Fetch driver’s license services from vehicle_service_sub
    const services = await prisma.vehicle_service_sub.findMany({
      where: {
        vs_id_fk: 8, // Driver’s license services
        vss_status: 1, // Active services
        vss_region: userRegion, // Match user’s region
      },
      select: {
        vss_id: true,
        vss_name: true,
        vss_amount: true,
        vss_va_duration: true,
        vss_region: true,
      },
      orderBy: { vss_priority: "asc" },
    });

    if (services.length === 0) {
      logger.warn("No driver’s license services found for region", {
        userRegion,
      });
      return NextResponse.json(
        {
          message: "No driver’s license services available for your region",
          services: [],
        },
        { status: 200 }
      );
    }

    // Return services with minimal transformation
    const formattedServices = services.map((service) => ({
      id: service.vss_id.toString(), // Use vss_id directly
      name: service.vss_name, // Use vss_name as-is (e.g., "Fresh - 5 years")
      price: service.vss_amount.toString(), // Convert Decimal to string
      duration: service.vss_va_duration || null, // Use vss_va_duration or null
      region: service.vss_region.toString(), // Include vss_region for reference
    }));

    return NextResponse.json(
      {
        message: "Driver’s license services retrieved successfully",
        services: formattedServices,
      },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error fetching driver’s license services", {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
