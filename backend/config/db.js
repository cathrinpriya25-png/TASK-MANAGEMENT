import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  database: process.env.DB_NAME || 'task_portal_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection immediately
try {
  const connection = await pool.getConnection();
  console.log('Successfully connected to MySQL database pool.');
  connection.release();
} catch (err) {
  console.error('Error connecting to MySQL database:', err.message);
}

export default pool;
