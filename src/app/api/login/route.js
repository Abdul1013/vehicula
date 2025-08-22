// // app/api/login/route.ts
// import { NextResponse } from 'next/server';
// import mysql from 'mysql2/promise';
// import { SALT } from '@/lib/config'; // Define this in .env or lib

// export async function POST(req) {
//   const { phone, pwd } = await req.json();

//   if (!phone || !pwd) {
//     return NextResponse.json({ message: 'All fields required' }, { status: 400 });
//   }

//   try {
//     const hashedPwd = require('crypto')
//       .createHash('md5')
//       .update(pwd + SALT)
//       .digest('hex');

//     const cleanedPhone = phone.replace(/\D/g, '');

//     const connection = await mysql.createConnection({
//       host,
//       user,
//       password,
//       database,
//     });

//     const [rows] = await connection.execute(
//       'SELECT * FROM users WHERE phone = ? AND password = ? LIMIT 1',
//       [cleanedPhone, hashedPwd]
//     );

//     if (!Array.isArray(rows) || rows.length === 0) {
//       return NextResponse.json({ message: 'Wrong phone number/password' }, { status: 401 });
//     }

//     const user = rows[0];

//     // Example session-like response (you'll store this in cookies or Supabase later)
//     return NextResponse.json({
//       message: 'Login successful',
//       userId: user.bk_uid,
//       role: user.bk_usr_role_fk,
//       redirect: user.bk_usr_role_fk === 1 ? '/ag-dashboard-switch' : '/dashboard',
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }
