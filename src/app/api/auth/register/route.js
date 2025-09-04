// src/app/api/auth/register/route.js (partial)
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { phone, email, password, confirmPassword, fullName, state, lga, refCode } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedPhone = phone ? phone.trim().replace(/^\+/, '') : null;

    const user = await prisma.bk_repository.create({
      data: {
        bk_email: email,
        bk_phone_number: normalizedPhone,
        bk_customer_full_name: fullName,
        bk_hash: hashedPassword,
        bk_default_region: parseInt(state),
        bk_lga: lga,
        bk_my_ref_code: refCode || null,
        bk_entry_date: new Date(),
        bk_status: 1,
        bk_phone_verified: 0,
        bk_email_verified: 0,
        bk_usr_role_fk: 1,
      },
    });

    const token = jwt.sign(
      { userId: user.bk_uid, phone: user.bk_phone_number, role: user.bk_usr_role_fk },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user.bk_uid,
        phone: user.bk_phone_number,
        fullName: user.bk_customer_full_name,
        email: user.bk_email,
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

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}