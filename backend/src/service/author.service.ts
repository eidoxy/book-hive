import { Author, AuthorQueryResult } from '../models/author.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getAuthors() {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<AuthorQueryResult[]>(
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
  }
}

export async function getAuthorById(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<AuthorQueryResult[]>(
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
  }
}

export async function createAuthor(bodyRequest: Author) {
  const connection = await getConnection();

  if (connection) {
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO authors (name, description) VALUES (?, ?)',
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
  }
}

export async function updateAuthor(id: number, bodyRequest: Author) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<AuthorQueryResult[]>(
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

    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE authors SET name = ?, description = ? WHERE id = ?',
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
  }
}

export async function deleteAuthor(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<AuthorQueryResult[]>(
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

    const [result] = await connection.query<ResultSetHeader>(
      'DELETE FROM authors WHERE id = ?',
      [id]
    );

    // ! : return the deleted author
    return {
      status: 200,
      message: `Author deleted with id ${id} successfully!`,
    };
  }
}
