import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { jwtVerify } from 'jose';
import { logger } from '../../../lib/logger';

export async function POST(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      logger.warn('No auth_token provided in dl_application request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId;

    logger.info('Token verified for dl_application', { userId });

    const user = await prisma.bk_repository.findUnique({
      where: { bk_uid: BigInt(userId) },
      select: {
        bk_uid: true,
        bk_status: true,
        bk_email_verified: true,
        bk_phone_verified: true,
      },
    });

    if (!user || user.bk_status !== 1 || !user.bk_email_verified || !user.bk_phone_verified) {
      logger.warn('User not active or unverified', { userId });
      return NextResponse.json({ error: 'User not active or unverified' }, { status: 403 });
    }

    const data = await request.json();
    const {
      first_name,
      surname,
      date_of_birth,
      blood_group,
      sex,
      licence_class,
      state_of_origin,
      local_government,
      address,
      phone_number,
      nin,
      other_name,
      mother_maiden_name,
      facial_mark,
      any_form_of_disability,
      height,
      next_of_kin_phone_number,
      email_address,
      price,
      service_id,
    } = data;

    // Validate required fields
    if (!first_name || !surname || !date_of_birth || !blood_group || !state_of_origin || !local_government || !address || !phone_number || !nin || !sex || !licence_class || !service_id) {
      logger.warn('Missing required fields in dl_application', { userId, data });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate service_id
    const validServiceIds = ['fresh-3', 'fresh-5', 'renew-3', 'renew-5', 'intl-1'];
    if (!validServiceIds.includes(service_id)) {
      logger.warn('Invalid service_id', { userId, service_id });
      return NextResponse.json({ error: 'Invalid service ID' }, { status: 400 });
    }

    // Validate licence_class
    const validLicenceClasses = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    if (!validLicenceClasses.includes(licence_class)) {
      logger.warn('Invalid licence_class', { userId, licence_class });
      return NextResponse.json({ error: 'Invalid license class' }, { status: 400 });
    }

    // Validate formats
    if (!/^\d{11}$/.test(nin)) {
      logger.warn('Invalid NIN format', { userId, nin });
      return NextResponse.json({ error: 'NIN must be 11 digits' }, { status: 400 });
    }
    if (!/^\d{10,15}$/.test(phone_number.replace(/^\+/, ''))) {
      logger.warn('Invalid phone number format', { userId, phone_number });
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 });
    }

    // Create application
    const application = await prisma.dl_application.create({
      data: {
        uid: user.bk_uid,
        first_name,
        surname,
        other_name: other_name || null,
        mother_maiden_name: mother_maiden_name || null,
        date_of_birth,
        facial_mark: facial_mark || null,
        blood_group,
        any_form_of_disability: any_form_of_disability || null,
        height: height || null,
        sex,
        licence_class,
        next_of_kin_phone_number: next_of_kin_phone_number || null,
        state_of_origin,
        local_government,
        address,
        phone_number,
        email_address: email_address || null,
        nin,
        service_id, // Store the service ID
        date_created: new Date(),
      },
    });

    // Initiate payment
    const paymentRef = `DL-${user.bk_uid}-${Date.now()}`;
    await prisma.vehicle_pay_gate_unsaved.create({
      data: {
        p_g_usr_fk: user.bk_uid,
        p_g_amnt: price,
        p_g_reference: paymentRef,
        p_g_entry_date: new Date(),
      },
    });

    logger.info('Driver’s license application submitted', {
      userId,
      applicationId: String(application.uid),
      paymentRef,
      service_id,
      licence_class,
    });

    return NextResponse.json({
      message: 'Application submitted successfully',
      applicationId: String(application.uid),
      paymentRef,
    }, { status: 201 });
  } catch (error) {
    logger.error('Error submitting dl_application', {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}