import { ResultSetHeader } from 'mysql2';

import { LibraryProfileQueryResult } from '../../models/libraryProfile.mode';
import getConnection from '..';

const data = {
  name: 'Book Hive',
  address: 'Kampus PENS',
  phone: '1234567890',
  email: 'bookhive@pens.ac.id',
  year_established: new Date().getFullYear(),
};

export default async function seedLibraryProfile() {
  try {
    const connection = await getConnection();

    if (connection) {
      const [rows] = await connection.query<
        LibraryProfileQueryResult[]
      >('SELECT * FROM library_profile WHERE email = ?', [
        data.email,
      ]);

      // ? : check if there is no library profile with the email
      if (rows.length === 0) {
        await connection.query<ResultSetHeader>(
          'INSERT INTO library_profile (name, address, phone, email, year_established) VALUES (?, ?, ?, ?, ?)',
          [
            data.name,
            data.address,
            data.phone,
            data.email,
            data.year_established,
          ]
        );

        console.log(
          `Library profile with email ${data.email} seeded!`
        );
      } else {
        console.log(
          `Library profile with email ${data.email} already exists!`
        );
      }

      connection.end();
    }
  } catch (error) {
    console.error('Error seeding library profile:', error);
  }
}
