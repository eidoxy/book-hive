import {
  LibraryProfile,
  LibraryProfileQueryResult,
} from '../models/libraryProfile.mode';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getLibraryProfiles() {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<
      LibraryProfileQueryResult[]
    >('SELECT * FROM library_profile');

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
  }
}

export async function updateLibrary(
  id: number,
  bodyRequest: LibraryProfile
) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<ResultSetHeader>(
      'SELECT * FROM library_profile WHERE id = ?',
      [id]
    );

    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE library_profile SET name = ?, address = ?, phone = ?, email = ?, year_establised = ? WHERE id = ?',
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
  }
}
