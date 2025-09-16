//register/route.js
export const runtime = "nodejs";

import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { logger } from '../../../../lib/logger';
import { getRegionId } from '../../../../lib/lga-to-region';

export async function POST(request) {
  try {
    const { phone, email, fullName, password, state, lga } = await request.json();
    logger.info('Register attempt', { phone, email, state, lga });

    // Validate required fields
    if (!phone || !email || !fullName || !password) {
      logger.warn('Missing required fields', { phone, email, fullName, hasPassword: !!password, state, lga });
      return NextResponse.json({ error: 'Phone, email, full name, and password are required' }, { status: 400 });
    }

    const normalizedPhone = phone.trim().replace(/^\+/, '');
    const phoneWithZero = normalizedPhone.replace(/^234/, '0');
    if (!/^\d{10,15}$/.test(normalizedPhone)) {
      logger.warn('Invalid phone format', { phone: normalizedPhone });
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      logger.warn('Invalid email format', { email });
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      logger.warn('Invalid password format', { phone: normalizedPhone });
      return NextResponse.json({ error: 'Password must be 8+ characters with uppercase and numbers' }, { status: 400 });
    }

    // Check for existing user
    const existingUser = await prisma.bk_repository.findFirst({
      where: {
        OR: [
          { bk_phone_number: normalizedPhone },
          { bk_phone_number: '+' + normalizedPhone },
          { bk_phone_number: phoneWithZero },
          { bk_email: email },
        ],
      },
    });

    if (existingUser) {
      logger.warn('User already exists', { phone: normalizedPhone, email });
      return NextResponse.json({ error: 'Phone number or email already registered' }, { status: 409 });
    }

    // Get region_id from state and LGA
    const regionId = await getRegionId(state, lga);

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.bk_repository.create({
      data: {
        bk_email: email,
        bk_phone_number: normalizedPhone,
        bk_customer_full_name: fullName,
        bk_hash: hash,
        bk_lga: lga || null,
        bk_entry_date: new Date(),
        bk_status: 1,
        bk_phone_verified: 1,
        bk_email_verified: 1,
        bk_usr_role_fk: 1,
        must_change_password: false,
        bk_default_region: regionId,
      },
    });

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
      message: 'Registration successful',
      user: {
        id: String(user.bk_uid),
        phone: user.bk_phone_number,
        fullName: user.bk_customer_full_name,
        email: user.bk_email,
        mustChangePassword: user.must_change_password,
        isDefaultPassword: false,
      },
    });

    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    });

    logger.info('Registration successful', { uid: String(user.bk_uid), phone: user.bk_phone_number });
    return response;
  } catch (error) {
    logger.error('Registration error', { error: error.message, stack: error.stack });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}