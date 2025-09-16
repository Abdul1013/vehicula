export const runtime = "nodejs";
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { jwtVerify } from 'jose';
import { logger } from '../../../lib/logger';

export async function GET(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      logger.warn('No auth_token provided in user request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId;

    logger.info('Fetching user data', { userId });

    const user = await prisma.bk_repository.findUnique({
      where: { bk_uid: BigInt(userId) },
      select: {
        bk_uid: true,
        bk_email: true,
        bk_phone_number: true,
        bk_customer_full_name: true,
        bk_address: true,
        bk_photo: true,
        bk_status: true,
        bk_email_verified: true,
        bk_phone_verified: true,
        bk_default_region: true,
        bk_usr_role_fk: true,
        must_change_password: true,
        regions: {
          select: {
            reg_label: true, // Get region name from regions table
          },
        },
      },
    });

    if (!user) {
      logger.warn('User not found', { userId });
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: String(user.bk_uid),
      email: user.bk_email,
      phone: user.bk_phone_number || null,
      fullName: user.bk_customer_full_name || null,
      address: user.bk_address || null,
      photo: user.bk_photo || null,
      status: user.bk_status,
      emailVerified: Boolean(user.bk_email_verified),
      phoneVerified: Boolean(user.bk_phone_verified),
      region: user.regions?.reg_label || null, // Use region name
      role: user.bk_usr_role_fk || null,
      mustChangePassword: user.must_change_password,
    }, { status: 200 });
  } catch (error) {
    logger.error('Error fetching user data', { error: error.message, stack: error.stack });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}