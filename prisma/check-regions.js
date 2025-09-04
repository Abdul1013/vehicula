// prisma/check-regions.js
import { prisma } from "../src/lib/prisma";
import { logger } from "../src/lib/logger";

async function checkRegions() {
  try {
    const regions = await prisma.regions.findMany({
      select: { reg_id: true, reg_label: true, reg_abbrev: true },
    });
    logger.info("Regions found", { regions });
    console.log("Regions:", regions);
  } catch (error) {
    logger.error("Error checking regions", { error: error.message });
    console.error("Error checking regions:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRegions();
