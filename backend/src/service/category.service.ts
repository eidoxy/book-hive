import { Category, CategoryQueryResult } from '../models/category.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getCategories() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<CategoryQueryResult[]>(
      'SELECT * FROM categories'
    );

    // ? : check if there are no categories
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No categories found',
      };
    }

    // ! : return the fetched categories
    return {
      status: 200,
      message: 'Categories fetched successfully!',
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

export async function getCategoryById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<CategoryQueryResult[]>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    // ? : check if the category is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Category with id ${id} not found`,
      };
    }

    // ! : return the fetched category
    return {
      status: 200,
      message: 'Category fetched successfully!',
      payload: rows[0],
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

export async function createCategory(bodyRequest: Category) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO categories (
          name
        ) 
        VALUES (?)
      `,
      bodyRequest.name
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create category',
      };
    }

    // ! : return the created category
    return {
      status: 201,
      message: 'Category created successfully!',
      payload: {
        id: bodyRequest.id,
        name: bodyRequest.name,
      },
    };
  } catch (error) {
    console.error('An error occurred while creating a category: ', error);
    return {
      status: 500,
      message: 'Failed to create category',
    };
  } finally {
    await db.end();
  }
}

export async function updateCategory(id: number, bodyRequest: Category) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<CategoryQueryResult[]>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    // ? : check if there is no category with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Category with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE categories SET
        name = ?
        WHERE id = ?
      `,
      [bodyRequest.name, id]
    );

    // ! : return the updated category
    return {
      status: 200,
      message: 'Category updated successfully!',
      payload: {
        id,
        name: bodyRequest.name,
      },
    };
  } catch (error) {
    console.error('An error occurred while updating a category: ', error);
    return {
      status: 500,
      message: 'Failed to update category',
    };
  } finally {
    await db.end();
  }
}

export async function deleteCategory(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<CategoryQueryResult[]>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    // ? : check if there is no category with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Category with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );

    // ! : return the deleted category
    return {
      status: 200,
      message: `Category with id ${id} deleted successfully!`,
    };
  } catch (error) {
    console.error('An error occurred while deleting a category: ', error);
    return {
      status: 500,
      message: 'Failed to delete category',
    };
  } finally {
    await db.end();
  }
}
