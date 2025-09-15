// src/lib/lga-to-region.js
import { prisma } from './prisma';
import { logger } from './logger';
import lgaData from '../../public/lga-data.json';

// Cache regions to avoid repeated queries
let regionCache = null;

async function getRegions() {
  if (regionCache) {
    return regionCache;
  }
  try {
    const regions = await prisma.regions.findMany({
      select: { reg_id: true, reg_label: true, reg_abbrev: true },
    });
    regionCache = regions;
    logger.info('Regions cached', { regions });
    return regions;
  } catch (error) {
    logger.error('Error fetching regions', { error: error.message });
    return [];
  }
}


export async function getRegionId(state, lga) {
  const regions = await getRegions();

  // Try to find the state from the LGA in JSON first
  let matchedState = state?.toLowerCase();

  if (lga) {
    const lgaMatch = lgaData.find(s =>
      s.lgas.some(l => l.toLowerCase() === lga.toLowerCase())
    );
    if (lgaMatch) {
      matchedState = lgaMatch.state.toLowerCase();
      logger.info('LGA matched to state', { lga, state: matchedState });
    } else {
      logger.warn('LGA not found in JSON', { lga });
    }
  }

  // Match the region in DB by state
  const region = regions.find(r => r.reg_label.toLowerCase() === matchedState);

  if (region) {
    logger.info('Found region in DB', { state: matchedState, regionId: region.reg_id });
    return region.reg_id;
  }

  logger.error('Region not found for state/LGA', { state, lga });
  return null; // or throw an error if you want
}


export function getStatesAndLgas() {
  return lgaData.map(s => ({
    state: s.state,
    lgas: s.lgas,
  }));
}
