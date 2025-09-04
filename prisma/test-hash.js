// prisma/test-hash.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const TARGET_PHONE = '08106140864';

async function testHash() {
  try {
    const user = await prisma.bk_repository.findFirst({
      where: {
        OR: [
          { bk_phone_number: TARGET_PHONE },
          { bk_phone_number: '+' + TARGET_PHONE.replace(/^0/, '234') },
          { bk_phone_number: TARGET_PHONE.replace(/^0/, '234') },
        ],
      },
      select: { bk_uid: true, bk_phone_number: true, bk_hash: true },
    });

    if (!user) {
      console.error(`❌ User not found for phone: ${TARGET_PHONE}`);
      return;
    }

    console.log('Stored hash:', user.bk_hash);
    const isValid = await bcrypt.compare('Default@123', user.bk_hash);
    console.log('Password "Default@123" valid:', isValid);
  } catch (error) {
    console.error('Error testing hash:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testHash();