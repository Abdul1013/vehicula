// prisma/set-flag.js
import { prisma } from '../src/lib/prisma.js';

const TARGET_PHONE = '08106140864';

async function setFlag() {
  try {
    const user = await prisma.bk_repository.findFirst({
      where: {
        OR: [
          { bk_phone_number: TARGET_PHONE },
          { bk_phone_number: '+' + TARGET_PHONE.replace(/^0/, '234') },
          { bk_phone_number: TARGET_PHONE.replace(/^0/, '234') },
        ],
      },
      select: { bk_uid: true, bk_phone_number: true },
    });

    if (!user) {
      console.error(`❌ User not found for phone: ${TARGET_PHONE}`);
      return;
    }

    await prisma.bk_repository.update({
      where: { bk_uid: user.bk_uid },
      data: { must_change_password: false },
    });
    console.log(`✅ Set must_change_password to false for user ${user.bk_uid}`);
  } catch (error) {
    console.error('❌ Error setting flag:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setFlag();