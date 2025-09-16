// src/app/api/auth/change-password/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { logger } from '../../../../lib/logger';

export async function POST(request) {
  try {
    const { currentPassword, newPassword } = await request.json();
    const token = request.cookies.get('auth_token')?.value;
    logger.info('Change password request', { hasCurrentPassword: !!currentPassword, hasNewPassword: !!newPassword, hasToken: !!token });

    if (!token || !currentPassword || !newPassword) {
      logger.warn('Missing fields in change-password request', { token: !!token, currentPassword: !!currentPassword, newPassword: !!newPassword });
      return NextResponse.json({ error: 'Missing required fields or token' }, { status: 400 });
    }

    let decoded;
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      decoded = payload;
      logger.info('Token verified', { userId: decoded.userId, phone: decoded.phone });
    } catch (error) {
      logger.warn('Token verification failed', { error: error.message });
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const user = await prisma.bk_repository.findUnique({
      where: { bk_uid: BigInt(decoded.userId) },
      select: { bk_uid: true, bk_hash: true, bk_phone_number: true, bk_customer_full_name: true, bk_email: true, bk_usr_role_fk: true },
    });

    if (!user) {
      logger.warn('User not found', { userId: decoded.userId });
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.bk_hash);
    if (!isCurrentPasswordValid) {
      logger.warn('Current password invalid', { phone: user.bk_phone_number });
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
    }

    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      logger.warn('Invalid new password', { phone: user.bk_phone_number });
      return NextResponse.json({ error: 'Password must be 8+ characters with uppercase and numbers' }, { status: 400 });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await prisma.bk_repository.update({
      where: { bk_uid: user.bk_uid },
      data: {
        bk_hash: newHash,
        must_change_password: false,
      },
    });

    // Verify update
    const updatedUser = await prisma.bk_repository.findUnique({
      where: { bk_uid: user.bk_uid },
      select: { must_change_password: true },
    });
    if (updatedUser.must_change_password !== false) {
      logger.error('Failed to update must_change_password', { uid: String(user.bk_uid) });
      return NextResponse.json({ error: 'Failed to update password state' }, { status: 500 });
    }

    // Issue new JWT
    const newToken = await new SignJWT({
      userId: String(user.bk_uid),
      phone: user.bk_phone_number,
      role: Number(user.bk_usr_role_fk),
      mustChangePassword: false,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = NextResponse.json({ message: 'Password changed successfully' });
    response.cookies.set({
      name: 'auth_token',
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    logger.info('Password changed successfully', { uid: String(user.bk_uid), phone: user.bk_phone_number });
    return response;
  } catch (error) {
    logger.error('Change password error', { error: error.message, stack: error.stack });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}