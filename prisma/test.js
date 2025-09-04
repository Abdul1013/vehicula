// prisma/test.js
import { prisma } from '../src/lib/prisma.js';
async function test() {
  try {
    const user = await prisma.bk_repository.findFirst({
      where: { bk_phone_number: '08106140864' },
      select: { bk_uid: true, bk_phone_number: true, must_change_password: true },
    });
    console.log('Test query result:', user);
  } catch (error) {
    console.error('Test query error:', error);
  } finally {
    await prisma.$disconnect();
  }
}
test();