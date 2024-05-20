import { Author, AuthorQueryResult } from '../models/author.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getAuthors() {
  const connection = await getConnection();
  if (connection) {
    // ? : fetch all authors
    const [rows] = await connection.query<AuthorQueryResult[]>(
      'SELECT * FROM authors'
    );

    // ! : return the authors
    return {
      statusCode: 200,
      message: 'Authors fetched successfully!',
      payload: rows,
    };
  }
}

export async function getAuthorById(id: number) {
  const connection = await getConnection();
  if (connection) {
    // ? : fetch author by id
    const [rows] = await connection.query<AuthorQueryResult[]>(
      'SELECT * FROM authors WHERE id = ?',
      [id]
    );

    // ? : check if the author is found
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: `Author with id ${id} not found`,
      };
    }

    // ! : return the authors
    return {
      statusCode: 200,
      message: 'Author fetched successfully!',
      payload: rows[0],
    };
  }
}

export async function createAuthor(bodyRequest: Author) {
  const connection = await getConnection();
  if (connection) {
    // ? : create author
    const [result] = await connection.query<AuthorQueryResult[]>(
      'INSERT INTO authors (name, description) VALUES (?, ?)',
      [bodyRequest.name, bodyRequest.description]
    );

    // ! : return the created author
    return {
      statusCode: 201,
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

    // ? : check if the author is found
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: `Author with id ${id} not found`,
      };
    }

    // ? : update author
    const [result] = await connection.query<AuthorQueryResult[]>(
      'UPDATE authors SET name = ?, description = ? WHERE id = ?',
      [bodyRequest.name, bodyRequest.description, id]
    );

    // ! : return the updated author
    return {
      statusCode: 200,
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

    // ? : check if the author is found
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: `Author with id ${id} not found`,
      };
    }

    const [result] = await connection.query<ResultSetHeader>(
      'DELETE FROM authors WHERE id = ?',
      [id]
    );

    // ! : return the deleted author
    return {
      statusCode: 200,
      message: `Author deleted with id ${id} successfully!`,
    };
  }
}
