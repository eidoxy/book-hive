import { Category, CategoryQueryResult } from '../models/category.model';

import getConnection from '../database';

export async function getCategories() {
  const connection = await getConnection();
  if (connection) {
    const [rows] = await connection.query<CategoryQueryResult[]>('SELECT * FROM categories');

    return {
      statusCode: 200,
      massage: 'Caegoires fetched successfully!',
      payload: rows,
    };
  }
}
