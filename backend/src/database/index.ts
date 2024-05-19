import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export default async function getConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
}
