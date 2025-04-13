const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../../.env' });

// Tạo pool connection đến SQL
const pool = mysql.createPool({
  host: process.env.SQL_HOST || 'localhost',
  user: process.env.SQL_USER || 'root',
  password: process.env.SQL_PASSWORD || '',
  database: process.env.SQL_DATABASE || 'heritage_journey',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Kiểm tra kết nối
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Kết nối thành công đến SQL Database!');
    connection.release();
    return true;
  } catch (error) {
    console.error('Lỗi kết nối SQL:', error.message);
    return false;
  }
}

module.exports = {
  pool,
  testConnection
}; 