// src/app/api/states-lgas/route.js
import { NextResponse } from 'next/server';
import { logger } from '../../../lib/logger';
import { getStatesAndLgas } from '../../../lib/lga-to-region';

export async function GET() {
  try {
    const states = getStatesAndLgas();
    logger.info('Fetched states and LGAs', { count: states.length });
    return NextResponse.json({ states });
  } catch (error) {
    logger.error('Error fetching states and LGAs', { error: error.message, stack: error.stack });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}