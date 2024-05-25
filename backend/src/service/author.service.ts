import { Author, AuthorQueryResult } from '../models/author.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getAuthors() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AuthorQueryResult[]>(
      'SELECT * FROM authors'
    );

    // ? : check if there are no authors
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No authors found',
      };
    }

    // ! : return the fetched authors
    return {
      status: 200,
      message: 'Authors fetched successfully!',
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

export async function getAuthorById(id: number) {
  const db = await getConnection();

  // ? :  check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AuthorQueryResult[]>(
      'SELECT * FROM authors WHERE id = ?',
      [id]
    );

    // ? : check if the author is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Author with id ${id} not found`,
      };
    }

    // ! : return the fetched authors
    return {
      status: 200,
      message: 'Author fetched successfully!',
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

export async function createAuthor(bodyRequest: Author) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO authors (
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
        message: 'Failed to create author',
      };
    }

    // ! : return the created author
    return {
      status: 201,
      message: 'Author created successfully!',
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

export async function updateAuthor(id: number, bodyRequest: Author) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AuthorQueryResult[]>(
      'SELECT * FROM authors WHERE id = ?',
      [id]
    );

    // ? : check if there is no author with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Author with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE authors SET
        name = ?,
        description = ?
        WHERE id = ?
      `,
      [bodyRequest.name, bodyRequest.description, id]
    );

    // ! : return the updated author
    return {
      status: 200,
      message: 'Author updated successfully!',
      payload: {
        id,
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

export async function deleteAuthor(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AuthorQueryResult[]>(
      'SELECT * FROM authors WHERE id = ?',
      [id]
    );

    // ? : check if there is no author with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Author with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM authors WHERE id = ?',
      [id]
    );

    // ! : return the deleted author
    return {
      status: 200,
      message: `Author deleted with id ${id} successfully!`,
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
