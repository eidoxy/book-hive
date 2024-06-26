import { Shelf, ShelfQueryResult } from './../models/shelf.mode';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getShelves() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<ShelfQueryResult[]>(
      'SELECT * FROM shelves'
    );

    // ? : check if there are no shelves
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No shelves found',
      };
    }

    // ! : return the fetched shelf
    return {
      status: 200,
      message: 'Shelf fetched successfully!',
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

export async function getShelfById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<ShelfQueryResult[]>(
      'SELECT * FROM shelves WHERE id = ?',
      [id]
    );

    // ? : check if the shelf is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Shelf with id ${id} not found`,
      };
    }

    // ! : return the fetched category
    return {
      status: 200,
      message: 'Shelf fetched successfully!',
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

export async function createShelf(bodyRequest: Shelf) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO shelves (
          name,
          description
        )
        VALUES (?, ?)
      `,
      [bodyRequest.name, bodyRequest.description]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create shelf',
      };
    }

    // ! : return the created shelf
    return {
      status: 201,
      message: 'Shelf created successfully!',
      payload: {
        id: bodyRequest.id,
        name: bodyRequest.name,
        description: bodyRequest.description,
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

export async function updateShelf(id: number, bodyRequest: Shelf) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<ShelfQueryResult[]>(
      'SELECT * FROM shelves WHERE id = ?',
      [id]
    );

    // ? : check if there is no shelf with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Shelf with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE shelves SET
        name = ?,
        description = ?
        WHERE id = ?
      `,
      [bodyRequest.name, bodyRequest.description, id]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to update shelf',
      };
    }

    // ! : return the updated shelf
    return {
      status: 200,
      message: 'Shelf updated successfully!',
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

export async function deleteShelf(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<ShelfQueryResult[]>(
      'SELECT * FROM shelves WHERE id = ?',
      [id]
    );

    // ? : check if there is no shelf with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Shelf with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM shelves WHERE id = ?',
      [id]
    );

    // ! : return the deleted shelf
    return {
      status: 200,
      message: `Shelf with id ${id} deleted successfully!`,
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
