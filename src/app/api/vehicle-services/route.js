// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const services = await prisma.vehicle_services.findMany({
//       select: {
//         v_s_id: true,
//         v_s_name: true,
//         v_s_status: true,
//         v_s_priority: true,
//         v_s_icon: true,
//       },
//       where: {
//         v_s_status: 1, // Only fetch active services
//       },
//       orderBy: { v_s_priority: "asc" }, // Order by priority
//     });
//     return NextResponse.json(services, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching vehicle services:", error);
//     return NextResponse.json(
//       { error: "Error fetching services" },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// }


import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET: Fetch all services (filterable by status)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // active | inactive | all

    let whereCondition = {};
    if (status === "active") whereCondition = { v_s_status: 1 };
    else if (status === "inactive") whereCondition = { v_s_status: 0 };

    const services = await prisma.vehicle_services.findMany({
      select: {
        v_s_id: true,
        v_s_name: true,
        v_s_status: true,
        v_s_priority: true,
        v_s_icon: true,
        v_s_description: true,
        v_s_path: true,
      },
      where: whereCondition,
      orderBy: { v_s_priority: "asc" },
    });

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Error fetching services" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// POST: Create a new service
export async function POST(req) {
  try {
    const { name, priority, icon, description, path } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Service name is required" }, { status: 400 });
    }

    const newService = await prisma.vehicle_services.create({
      data: {
        v_s_name: name,
        v_s_priority: priority ? Number(priority) : 1,
        v_s_icon: icon || "",
        v_s_status: 1, // Default active
        v_s_description: description || null,
        v_s_path: path || null,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Error creating service" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH: Update service or toggle active/inactive
export async function PATCH(req) {
  try {
    const { id, name, priority, icon, status, description, path } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const updatedService = await prisma.vehicle_services.update({
      where: { v_s_id: Number(id) },
      data: {
        ...(name && { v_s_name: name }),
        ...(priority !== undefined && { v_s_priority: Number(priority) }),
        ...(icon && { v_s_icon: icon }),
        ...(status !== undefined && { v_s_status: Number(status) }),
        ...(description !== undefined && { v_s_description: description || null }),
        ...(path !== undefined && { v_s_path: path || null }),
      },
    });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Error updating service" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE: Soft delete (set status = 0)
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const deletedService = await prisma.vehicle_services.update({
      where: { v_s_id: Number(id) },
      data: { v_s_status: 0 }, // Soft delete
    });

    return NextResponse.json({ message: "Service deactivated", service: deletedService }, { status: 200 });
  } catch (error) {
    console.error("Error deactivating service:", error);
    return NextResponse.json({ error: "Error deactivating service" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}