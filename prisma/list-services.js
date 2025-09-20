// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function listEntries() {
//   try {
//     const entries = await prisma.vehicle_service_sub.findMany({
//       select: {
//         vss_id: true,
//         vss_name: true,
//         vss_region: true,
//         vss_amount: true,
//         vss_status: true,
//         vss_priority: true,
//         vss_icon: true,
//         vs_id_fk: true,
//         vss_interest: true,
//         vss_initial_deposit_perc: true,
//         vss_initial_deposit: true,
//         vss_duration: true,
//         vss_finance_amnt: true,
//         vss_price_lock_perc: true,
//         vss_va_price: true,
//         vss_va_duration: true,
//       },
//       orderBy: { vss_id: "asc" },
//     });

//     console.log("All entries in vehicle_service_sub table:");
//     console.log(`Total entries: ${entries.length}`);
//     console.log(
//       "Column names: vss_id, vss_name, vss_region, vss_amount, vss_status, vss_priority, vss_icon, vs_id_fk, vss_interest, vss_initial_deposit_perc, vss_initial_deposit, vss_duration, vss_finance_amnt, vss_price_lock_perc, vss_va_price, vss_va_duration"
//     );
//     console.log(
//       "--------------------------------------------------------------------------------"
//     );

//     entries.forEach((entry, index) => {
//       console.log(`Entry ${index + 1}:`);
//       Object.entries(entry).forEach(([key, value]) => {
//         // Handle Decimal types (convert to string for clean output)
//         console.log(
//           `  ${key}: ${typeof value === "object" && value !== null ? value.toString() : value}`
//         );
//       });
//       console.log("");
//     });
//   } catch (error) {
//     console.error("Error fetching entries:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// listEntries();



import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function listEntries() {
  try {
    const entries = await prisma.vehicle_services.findMany({
      select: {
        v_s_id: true,
        v_s_name: true,
        v_s_status: true,
        v_s_priority: true,
        v_s_icon: true,
      },
      orderBy: { v_s_id: "asc" },
    });

    console.log("All entries in vehicle_services table:");
    console.log(`Total entries: ${entries.length}`);
    console.log(
      "Column names: v_s_id, v_s_name, v_s_status, v_s_priority, v_s_icon"
    );
    console.log(
      "--------------------------------------------------------------------------------"
    );

    entries.forEach((entry, index) => {
      console.log(`Entry ${index + 1}:`);
      Object.entries(entry).forEach(([key, value]) => {
        console.log(
          `  ${key}: ${typeof value === "object" && value !== null ? value.toString() : value}`
        );
      });
      console.log("");
    });
  } catch (error) {
    console.error("Error fetching entries:", error);
  } finally {
    await prisma.$disconnect();
  }
}

listEntries();