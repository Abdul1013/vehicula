// prisma/reset-password.js
import { prisma } from '../src/lib/prisma.js';
import bcrypt from 'bcryptjs';
import { logger } from '../src/lib/logger.js';

const DEFAULT_PASSWORD = 'Default@123';
// const TARGET_PHONE = '08106140864';
const TARGET_PHONE = '07083186357';

async function resetPassword() {
  try {
    // Reset for specific user
    const user = await prisma.bk_repository.findFirst({
      where: {
        OR: [
          { bk_phone_number: TARGET_PHONE },
          { bk_phone_number: '+' + TARGET_PHONE.replace(/^0/, '234') },
          { bk_phone_number: TARGET_PHONE.replace(/^0/, '234') },
        ],
      },
      select: { bk_uid: true, bk_phone_number: true, bk_email: true },
    });

    if (!user) {
      logger.error(`User not found for phone: ${TARGET_PHONE}`);
      console.error(`❌ User not found for phone: ${TARGET_PHONE}`);
      return;
    }

    const newHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    await prisma.bk_repository.update({
      where: { bk_uid: user.bk_uid },
      data: {
        bk_hash: newHash,
        must_change_password: true,
      },
    });
    logger.info(`Password reset for user`, { uid: String(user.bk_uid), phone: user.bk_phone_number });
    console.log(`✅ Password reset for user ${user.bk_uid} (phone: ${user.bk_phone_number})`);

    // Optional: Reset ALL users (uncomment for bulk reset)
    /*
    const users = await prisma.bk_repository.findMany({
      select: { bk_uid: true, bk_phone_number: true, bk_email: true },
    });
    for (const u of users) {
      const hash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
      await prisma.bk_repository.update({
        where: { bk_uid: u.bk_uid },
        data: {
          bk_hash: hash,
          must_change_password: true,
        },
      });
      logger.info(`Password reset for user`, { uid: String(u.bk_uid), phone: u.bk_phone_number });
      console.log(`✅ Reset password for user ${u.bk_uid} (phone: ${u.bk_phone_number})`);
    }
    logger.info('Password reset complete for all users');
    console.log('🎉 Password reset complete for ALL users');
    */
  } catch (error) {
    logger.error('Error resetting password', { error: error.message, stack: error.stack });
    console.error('❌ Error resetting password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();