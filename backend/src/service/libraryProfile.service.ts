import {
  LibraryProfile,
  LibraryProfileQueryResult,
} from '../models/libraryProfile.mode';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getLibraryProfiles() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<LibraryProfileQueryResult[]>(
      'SELECT * FROM library_profile'
    );

    // ? : check if there are no library profiles
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No library profiles found',
      };
    }

    // ! : return the fetched library profile
    return {
      status: 200,
      message: 'Library profile fetched successfully!',
      payload: rows,
    };
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await db.end();
  }
}

export async function updateLibrary(
  id: number,
  bodyRequest: LibraryProfile
) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<ResultSetHeader>(
      'SELECT * FROM library_profile WHERE id = ?',
      [id]
    );

    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE library_profile SET
        name = ?,
        address = ?,
        phone = ?,
        email = ?,
        year_establised = ?
        WHERE id = ?
      `,
      [
        bodyRequest.name,
        bodyRequest.address,
        bodyRequest.phone,
        bodyRequest.email,
        bodyRequest.year_established,
        id,
      ]
    );

    // ! : return the updated library profile
    return {
      status: 200,
      message: 'Library profile updated successfully!',
      payload: {
        ...bodyRequest,
        id,
      },
    };
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await db.end();
  }
}
