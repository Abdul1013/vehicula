import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; 

export async function GET() {
  try {
    if (!prisma.regions) {
      console.error('Prisma regions model is undefined. Check schema.prisma.');
      return NextResponse.json({ error: 'Internal server error: Database model not found' }, { status: 500 });
    }
    const regions = await prisma.regions.findMany({
      select: {
        reg_id: true,
        reg_label: true,
      },
    });
    return NextResponse.json(regions);
  } catch (error) {
    console.error('Error fetching regions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}