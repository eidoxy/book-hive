import {
  Category,
  CategoryQueryResult,
} from '../models/category.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getCategories() {
  const connection = await getConnection();
  if (connection) {
    const [rows] = await connection.query<CategoryQueryResult[]>(
      'SELECT * FROM categories'
    );

    // ! : return the fetched categories
    return {
      statusCode: 200,
      massage: 'Caegoires fetched successfully!',
      payload: rows,
    };
  }
}

export async function getCategoryById(id: number) {
  const connection = await getConnection();
  if (connection) {
    const [rows] = await connection.query<CategoryQueryResult[]>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    // ? : check if the category is found
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: `Category with id ${id} not found`,
      };
    }

    // ! : return the fetched category
    return {
      statusCode: 200,
      message: 'Category fetched successfully!',
      payload: rows[0],
    };
  }
}

export async function createCategory(bodyRequest: Category) {
  const connection = await getConnection();
  if (connection) {
    const [result] = await connection.query<CategoryQueryResult[]>(
      'INSERT INTO categories (name) VALUES (?)',
      bodyRequest.name
    );

    // ! : return the created category
    return {
      statusCode: 201,
      message: 'Category created successfully!',
      payload: {
        id: bodyRequest.id,
        name: bodyRequest.name,
      },
    };
  }
}

export async function updateCategory(
  id: number,
  bodyRequest: Category
) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<CategoryQueryResult[]>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    // ? : check if there is no category with the id
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: `Category with id ${id} not found`,
      };
    }

    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE categories SET name = ? WHERE id = ?',
      [bodyRequest.name, id]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        statusCode: 500,
        message: 'Failed to update category',
      };
    }

    // ! : return the updated category
    return {
      statusCode: 200,
      message: 'Category updated successfully!',
      payload: {
        id,
        name: bodyRequest.name,
      },
    };
  }
}

export async function deleteCategory(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<CategoryQueryResult[]>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    // ? : check if the category exists
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: `Category with id ${id} not found`,
      };
    }

    const [result] = await connection.query<ResultSetHeader>(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );

    // ! : return the deleted category
    return {
      statusCode: 200,
      message: `Category with id ${id} deleted successfully!`,
    };
  }
}
