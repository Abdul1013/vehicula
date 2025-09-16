import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const services = await prisma.vehicle_services.findMany({
      select: {
        v_s_id: true,
        v_s_name: true,
        v_s_status: true,
        v_s_priority: true,
        v_s_icon: true,
      },
      where: {
        v_s_status: 1, // Only fetch active services
      },
      orderBy: { v_s_priority: "asc" }, // Order by priority
    });
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching vehicle services:", error);
    return NextResponse.json(
      { error: "Error fetching services" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
