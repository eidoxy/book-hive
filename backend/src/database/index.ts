import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export default async function getConnection() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });
  console.log('Connected to MySQL!');
  return conn;
}
