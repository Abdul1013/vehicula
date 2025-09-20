// import { prisma } from "../src/lib/prisma.js";
// import { logger } from "../src/lib/logger.js";

// async function checkVehicleDocuments() {
//   try {
//     const documents = await prisma.vehicle_documents.findMany({
//       include: {
//         vehicle_categories: true, // 👈 pulls category info too
//       },
//     });

//     logger.info("Vehicle documents fetched", { count: documents.length });

//     console.log(`Total vehicle documents: ${documents.length}`);
//     documents.forEach((doc) => {
//       console.log({
//         id: doc.v_d_id,
//         name: doc.v_d_name,
//         order: doc.v_d_order,
//         categoryId: doc.v_d_cat_id_fk,
//         categoryName: doc.vehicle_categories?.v_cat_name || "N/A",
//       });
//     });
//   } catch (error) {
//     logger.error("Error fetching vehicle documents", { error: error.message });
//     console.error("Error fetching vehicle documents:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// checkVehicleDocuments();

import { prisma } from "../src/lib/prisma.js";
import { logger } from "../src/lib/logger.js";

async function checkVehicleCustomerServiceOptions() {
  try {
    const options = await prisma.vehicle_customer_service_options.findMany({
      take: 20, // 👈 fetch only 20 for safety
      include: {
        bk_repository_vehicle_customer_service_options_vcso_uidTobk_repository:
          {
            select: {
              bk_uid: true,
              bk_customer_full_name: true,
              bk_email: true,
              bk_phone_number: true,
            },
          },
        vehicle_service_sub: {
          select: { vss_id: true, vss_name: true },
        },
        bk_repository_vehicle_customer_service_options_vcso_entry_byTobk_repository:
          {
            select: { bk_uid: true, bk_customer_full_name: true },
          },
      },
    });

    logger.info("Vehicle customer service options fetched", {
      count: options.length,
    });

    console.log(`Total fetched: ${options.length}`);

    const tableData = options.map((opt) => ({
      ID: opt.vcso_id,
      UserID: opt.vcso_uid,
      UserName:
        opt
          .bk_repository_vehicle_customer_service_options_vcso_uidTobk_repository
          ?.bk_customer_full_name,
      ServiceSub: opt.vehicle_service_sub?.vss_name,
      Financing: opt.vcso_financing_amnt?.toString(),
      UnitAmount: opt.vcso_unit_amnt?.toString(),
      Interest: opt.vcso_interest?.toString(),
      DepositPercent: opt.vcso_initial_deposit_perc?.toString(),
      DepositAmount: opt.vcso_initial_deposit?.toString(),
      Duration: opt.vcso_duration,
      PaymentOption: opt.vcso_payment_options,
      EntryBy:
        opt
          .bk_repository_vehicle_customer_service_options_vcso_entry_byTobk_repository
          ?.bk_customer_full_name,
      EntryDate: opt.vcso_entry_date,
    }));

    console.table(tableData);
  } catch (error) {
    logger.error("Error fetching vehicle customer service options", {
      error: error.message,
    });
    console.error("Error fetching vehicle customer service options:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkVehicleCustomerServiceOptions();
