import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Mapping of current Font Awesome icons to Lucide icons
const iconMap = {
  "fa-ticket-alt": "CreditCard",
  "fa-recycle": "RefreshCcw",
  "fa-exchange-alt": "ArrowRightLeft",
  "fa-car-crash": "CarFront",
  "fa-file-invoice": "FileText",
  "fa-tools": "Wrench",
  "fa-id-card": "IdCard",
  "fa-graduation-cap": "GraduationCap",
  "fa-piggy-bank": "PiggyBank",
};

// Data for v_s_description and v_s_path
const serviceDetails = {
  "Plate Number": {
    description: "Fresh Plate number, Truck, replacement. Change of Category.",
    path: "/plate_number_service",
  },
  "Vehicle Particulars Renewal": {
    description: "Get your car registered with ease and flexible plans.",
    path: "/vehicle_particulars_renewal",
  },
  "Change of Ownership": {
    description: "Update your vehicle particulars after purchase.",
    path: "/change_of_ownership",
  },
  "Comprehensive Insurance": {
    description: "Specialized solutions for companies with multiple vehicles.",
    path: "/insurance",
  },
  "Local Government Paper": {
    description: "Setup installment plans for commercial vehicle permits.",
    path: "/local_permit",
  },
  "Spare Parts": {
    description: "Battery, Tyre, Engine oil, KEKE, Engine Oil",
    path: "/spare_parts",
  },
  "Driver's License": {
    description: "Save in bits for your vehicle particulars renewal.",
    path: "/dl_page",
  },
  "Driving School": {
    description: "1 month duration.",
    path: "/driving_school",
  },
  "Vehicular Goals": {
    description:
      "VG5K, VG10K, VG20K, VG30K, VG40K, VG50K, VG100K, VG200K, VG500K, VG1M",
    path: "/fleet",
  },
};

async function updateServices() {
  try {
    // Fetch all services
    const services = await prisma.vehicle_services.findMany();

    // Update each service
    for (const service of services) {
      const details = serviceDetails[service.v_s_name];
      const newIcon = iconMap[service.v_s_icon] || "ShieldCheck"; // Fallback to ShieldCheck

      if (!details) {
        console.warn(`No details found for service: ${service.v_s_name}`);
        continue;
      }

      await prisma.vehicle_services.update({
        where: { v_s_id: service.v_s_id },
        data: {
          v_s_icon: newIcon,
          v_s_description: details.description,
          v_s_path: details.path,
        },
      });

      console.log(`Updated service: ${service.v_s_name}`);
    }

    console.log("All services updated successfully!");
  } catch (error) {
    console.error("Error updating services:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateServices();