import { NextResponse } from 'next/server';
import { logger } from '../../../lib/logger';

export async function GET() {
  try {
    logger.info('Fetching static driver’s license services');

    const services = [
      { id: 'fresh-3', name: 'Fresh', duration: '3 years', price: 38000 },
      { id: 'fresh-5', name: 'Fresh', duration: '5 years', price: 45000 },
      { id: 'renew-3', name: 'Renewal', duration: '3 years', price: 26000 },
      { id: 'renew-5', name: 'Renewal', duration: '5 years', price: 30000 },
      { id: 'intl-1', name: 'International (IDP)', duration: '1 year', price: 25000 },
    ];

    return NextResponse.json(
      { message: 'Static services retrieved successfully', services },
      { status: 200 }
    );
  } catch (error) {
    logger.error('Error fetching static services', {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}