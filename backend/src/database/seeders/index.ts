import seedAdmins from './admin';
import seedLibraryProfile from './libraryProfile';

import getConnection from '..';

const seedDatabase = async () => {
  try {
    const connection = await getConnection();

    if (connection) {
      await seedAdmins();
      await seedLibraryProfile();

      connection.end();
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
