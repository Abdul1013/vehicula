// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { SignJWT } from 'jose';
import { logger } from '../../../../lib/logger';

const SALT = 'aaaaf914c1f005f862f3543ffb7a1111';

export async function POST(request) {
  try {
    const { phone, pwd } = await request.json();
    logger.info('Login attempt', { phone });

    if (!phone || !pwd) {
      logger.warn('Missing fields in login request', { phone, hasPwd: !!pwd });
      return NextResponse.json({ error: 'Phone and password are required' }, { status: 400 });
    }

    const normalizedPhone = phone.trim().replace(/^\+/, '');
    const phoneWithZero = normalizedPhone.replace(/^234/, '0');
    if (!/^\d{10,15}$/.test(normalizedPhone)) {
      logger.warn('Invalid phone format', { phone: normalizedPhone });
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    const user = await prisma.bk_repository.findFirst({
      where: {
        OR: [
          { bk_phone_number: normalizedPhone },
          { bk_phone_number: '+' + normalizedPhone },
          { bk_phone_number: phoneWithZero },
        ],
      },
      select: {
        bk_uid: true,
        bk_email: true,
        bk_customer_full_name: true,
        bk_phone_number: true,
        bk_hash: true,
        bk_usr_role_fk: true,
        must_change_password: true,
      },
    });

    if (!user) {
      logger.warn('User not found', { phone: normalizedPhone, phoneWithZero });
      return NextResponse.json({ error: 'Invalid phone number or password' }, { status: 401 });
    }

    logger.info('User found', { uid: String(user.bk_uid), phone: user.bk_phone_number });

    let isPasswordValid = false;
    if (user.bk_hash.startsWith('$2a$') || user.bk_hash.startsWith('$2y$') || user.bk_hash.startsWith('$2b$')) {
      isPasswordValid = await bcrypt.compare(pwd, user.bk_hash);
      logger.info('Bcrypt comparison', { uid: String(user.bk_uid), result: isPasswordValid });
    } else if (user.bk_hash.length === 32) {
      const md5Hash = crypto.createHash('md5').update(pwd + SALT).digest('hex');
      isPasswordValid = md5Hash === user.bk_hash;
      logger.info('MD5 comparison', { uid: String(user.bk_uid), result: isPasswordValid });
      if (isPasswordValid) {
        const newHash = await bcrypt.hash(pwd, 10);
        await prisma.bk_repository.update({
          where: { bk_uid: user.bk_uid },
          data: { bk_hash: newHash, must_change_password: true },
        });
        logger.info('Rehashed MD5 to bcrypt', { uid: String(user.bk_uid) });
      }
    }

    if (!isPasswordValid) {
      logger.warn('Password comparison failed', { phone: user.bk_phone_number });
      return NextResponse.json({ error: 'Invalid phone number or password' }, { status: 401 });
    }

    const token = await new SignJWT({
      userId: String(user.bk_uid),
      phone: user.bk_phone_number,
      role: Number(user.bk_usr_role_fk),
      mustChangePassword: user.must_change_password,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: String(user.bk_uid),
        phone: user.bk_phone_number,
        fullName: user.bk_customer_full_name,
        email: user.bk_email,
        mustChangePassword: user.must_change_password,
      },
    });

    response.cookies.set({
      name: 'auth_token',
      httpOnly: false, 
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    logger.info('Login successful', { phone: user.bk_phone_number, uid: String(user.bk_uid) });
    return response;
  } catch (error) {
    logger.error('Login error', { error: error.message, stack: error.stack });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}