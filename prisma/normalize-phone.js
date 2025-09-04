// prisma/normalize-phones.js
const { prisma } = require('../src/lib/prisma');

async function normalizePhones() {
  const users = await prisma.bk_repository.findMany({
    select: { bk_uid: true, bk_phone_number: true },
  });

  for (const user of users) {
    let normalized = user.bk_phone_number?.trim();
    if (normalized?.startsWith('+')) {
      normalized = normalized.replace(/^\+/, '');
    }
    if (normalized?.startsWith('0') && normalized.length === 11) {
      normalized = '234' + normalized.slice(1);
    }
    if (normalized !== user.bk_phone_number) {
      await prisma.bk_repository.update({
        where: { bk_uid: user.bk_uid },
        data: { bk_phone_number: normalized },
      });
      console.log(`Normalized phone for user ${user.bk_uid}: ${user.bk_phone_number} -> ${normalized}`);
    }
  }
  console.log('Normalization complete');
}

normalizePhones().catch(console.error).finally(() => prisma.$disconnect());