// prisma/check-hashes.js
import { prisma } from '../src/lib/prisma.js';
import { logger } from '../src/lib/logger.js';

async function checkHashes() {
  try {
    const users = await prisma.bk_repository.findMany({
      select: { bk_uid: true, bk_phone_number: true, bk_hash: true },
    });

    const md5Users = users.filter(user => user.bk_hash.length === 32 && /^[0-9a-fA-F]{32}$/.test(user.bk_hash));
    const bcryptUsers = users.filter(user => user.bk_hash.startsWith('$2a$') || user.bk_hash.startsWith('$2y$') || user.bk_hash.startsWith('$2b$'));

    logger.info('Hash analysis', {
      totalUsers: users.length,
      md5Count: md5Users.length,
      bcryptCount: bcryptUsers.length,
      md5Users: md5Users.map(user => ({ uid: String(user.bk_uid), phone: user.bk_phone_number })),
    });

    console.log(`Total users: ${users.length}`);
    console.log(`MD5 users: ${md5Users.length}`);
    console.log(`Bcrypt users: ${bcryptUsers.length}`);
    if (md5Users.length > 0) {
      console.log('MD5 users:', md5Users.map(user => ({ uid: String(user.bk_uid), phone: user.bk_phone_number })));
    }
  } catch (error) {
    logger.error('Error checking hashes', { error: error.message });
    console.error('Error checking hashes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkHashes();