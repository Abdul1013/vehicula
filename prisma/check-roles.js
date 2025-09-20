// // prisma/check-roles.js
// import { prisma } from '../src/lib/prisma.js';
// import { logger } from '../src/lib/logger.js';

// async function checkRoles() {
//   try {
//     // Pull only user ID, phone, and role
//     const users = await prisma.bk_repository.findMany({
//       select: { bk_uid: true, bk_phone_number: true, bk_usr_role_fk: true },
//     });

//     // Count occurrences of each role
//     const roleCounts = {};
//     users.forEach(user => {
//       const role = user.bk_usr_role_fk ?? 'unknown';
//       roleCounts[role] = (roleCounts[role] || 0) + 1;
//     });

//     // Log analysis
//     logger.info('Role analysis', {
//       totalUsers: users.length,
//       roleCounts,
//     });

//     // Console output
//     console.log(`Total users: ${users.length}`);
//     console.log('Role distribution:');
//     Object.entries(roleCounts).forEach(([role, count]) => {
//       console.log(`- Role ${role}: ${count} users`);
//     });

//     // Optionally, show a sample of users per role
//     const sampleByRole = {};
//     users.forEach(user => {
//       const role = user.bk_usr_role_fk ?? 'unknown';
//       if (!sampleByRole[role]) sampleByRole[role] = [];
//       if (sampleByRole[role].length < 5) {
//         sampleByRole[role].push({
//           uid: String(user.bk_uid),
//           phone: user.bk_phone_number,
//         });
//       }
//     });

//     console.log('Sample users per role:', sampleByRole);

//   } catch (error) {
//     logger.error('Error checking roles', { error: error.message });
//     console.error('Error checking roles:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// checkRoles();
// prisma/check-user-role.js

// import { prisma } from '../src/lib/prisma.js';

// async function checkRoles(phone) {
//   try {
//     // Normalize phone if needed (e.g. remove +234 to 0…)
//     const normalizedPhone = phone.trim().replace(/^\+/, '');

//     const user = await prisma.bk_repository.findFirst({
//       where: { bk_phone_number: normalizedPhone },
//       select: {
//         bk_uid: true,
//         bk_phone_number: true,
//         bk_usr_role_fk: true,
//       },
//     });

//     if (!user) {
//       console.log(`No user found with phone ${phone}`);
//       return;
//     }

//     console.log(`User ${user.bk_phone_number} (uid: ${user.bk_uid}) has role: ${user.bk_usr_role_fk}`);
//   } catch (error) {
//     console.error('Error checking user role:', error.message);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Example: check specific phone
// checkRoles('08106140864');

// prisma/check-role-by-email.js
import { prisma } from "../src/lib/prisma.js";
import { logger } from "../src/lib/logger.js";

const targetEmail = "raymond@vehiculars.ng";

async function checkRoles() {
  try {
    const user = await prisma.bk_repository.findFirst({
      where: { bk_email: targetEmail },
      select: { bk_uid: true, bk_email: true, bk_usr_role_fk: true },
    });

    if (user) {
      logger.info(
        `User ${user.bk_email} (uid: ${user.bk_uid}) has role: ${user.bk_usr_role_fk}`
      );
      console.log(
        `User ${user.bk_email} (uid: ${user.bk_uid}) has role: ${user.bk_usr_role_fk}`
      );
    } else {
      console.log(`No user found with email ${targetEmail}`);
    }
  } catch (error) {
    logger.error("Error checking role", { error: error.message });
    console.error("Error checking role:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRoles();
