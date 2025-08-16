import mysql from 'mysql2/promise';


export const db = mysql.createPool({
  host: process.env.DB_HOST,     // e.g., 'localhost' or cloud host
  user: process.env.DB_USER,     // e.g., 'root'
  password: process.env.DB_PASS, // your DB password
  database: process.env.DB_NAME, // your database name
});vehicula.ng

/**
 * Database configuration and connection pool
 * @type {Promise<import('mysql2/promise').Pool>}
 */
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// /**
//  * Execute a database query with parameters
//  * @param {string} sql SQL query string
//  * @param {Array} params Query parameters
//  * @returns {Promise<Array>} Query results
//  */
// export async function query(sql, params = []) {
//   try {
//     const [results] = await pool.execute(sql, params);
//     return results;
//   } catch (error) {
//     console.error('Database query error:', error);
//     throw new Error('Database operation failed');
//   }
// }

// /**
//  * Begin a database transaction
//  * @returns {Promise<import('mysql2/promise').PoolConnection>}
//  */
// export async function beginTransaction() {
//   const connection = await pool.getConnection();
//   await connection.beginTransaction();
//   return connection;
// }

// /**
//  * Commit a database transaction
//  * @param {import('mysql2/promise').PoolConnection} connection
//  */
// export async function commitTransaction(connection) {
//   try {
//     await connection.commit();
//   } finally {
//     connection.release();
//   }
// }

// /**
//  * Rollback a database transaction
//  * @param {import('mysql2/promise').PoolConnection} connection
//  */
// export async function rollbackTransaction(connection) {
//   try {
//     await connection.rollback();
//   } finally {
//     connection.release();
//   }
// }
// // lib/db.js
// import mysql from 'mysql2/promise';

// let pool = null;

/**
 * Initialize or return existing pool
 */
export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: parseInt(process.env.DB_CONN_LIMIT || '10', 10),
      queueLimit: 0,
      // recommend setting timezone or charset if needed:
      // timezone: 'Z',
    });
  }
  return pool;
}

/**
 * Run a SQL query with parameterized values.
 * Mirrors PHP query() behavior: returns rows array on success, false on failure.
 *
 * Usage:
 *   const rows = await query('SELECT * FROM users WHERE id = ?', [id])
 */
export async function query(sql, params = []) {
  try {
    const p = getPool();
    const [rows] = await p.execute(sql, params);
    return rows;
  } catch (err) {
    // Log for server-side debugging but don't crash caller
    console.error('DB query error:', err);
    return false;
  }
}
