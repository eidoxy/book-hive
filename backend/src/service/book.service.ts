import { Book, BookQueryResult } from '../models/book.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getBooks() {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<BookQueryResult[]>(
      `
        SELECT 
        b.id, 
        b.title, 
        b.cover, 
        b.description, 
        c.name AS category, 
        s.name AS shelf, 
        b.total_page, 
        b.created_at, 
        b.updated_at 
        FROM books b
        JOIN categories c ON b.categories_id = c.id
        JOIN shelves s ON b.shelves_id = s.id
      `
    );

    // ? : check if there are no books
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No books found',
      };
    }

    // ! : return the fetched books
    return {
      status: 200,
      message: 'Books fetched successfully!',
      payload: rows,
    };
  }
}

export async function getBookById(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<BookQueryResult[]>(
      `
        SELECT 
        b.id, 
        b.title, 
        b.cover, 
        b.description, 
        c.name AS category, 
        s.name AS shelf, 
        b.total_page, 
        b.created_at, 
        b.updated_at 
        FROM books b
        JOIN categories c ON b.categories_id = c.id
        JOIN shelves s ON b.shelves_id = s.id
        WHERE b.id = ?
      `,
      [id]
    );

    // ? : check if the book is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Book with id ${id} not found`,
      };
    }

    // ! : return the fetched book
    return {
      status: 200,
      message: 'Book fetched successfully!',
      payload: rows[0],
    };
  }
}

export async function createBook(bodyRequest: Book) {
  const connection = await getConnection();

  if (connection) {
    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO books 
      (title, cover, description, categories_id, shelves_id, total_page) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        bodyRequest.title,
        bodyRequest.cover,
        bodyRequest.description,
        bodyRequest.categories_id,
        bodyRequest.shelves_id,
        bodyRequest.pages,
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create book',
      };
    }

    // ! : return the created book
    return {
      status: 201,
      message: 'Book created succesfully!',
      payload: {
        ...bodyRequest,
      },
    };
  }
}

export async function updateBook(id: number, bodyRequest: Book) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<BookQueryResult[]>(
      'SELECT * FROM books WHERE id = ?',
      [id]
    );

    // ? : check if the book is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Book with id ${id} not found`,
      };
    }

    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE books SET title = ?, cover = ?, description = ?, categories_id = ?, shelves_id = ?, total_page = ? WHERE id = ?',
      [
        bodyRequest.title,
        bodyRequest.cover,
        bodyRequest.description,
        bodyRequest.categories_id,
        bodyRequest.shelves_id,
        bodyRequest.pages,
        id,
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to update book',
      };
    }

    // ! : return the updated book
    return {
      status: 200,
      message: 'Book updated successfully!',
      payload: {
        ...bodyRequest,
      },
    };
  }
}

export async function deleteBook(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<BookQueryResult[]>(
      'SELECT * FROM books WHERE id = ?',
      [id]
    );

    // ? : check if the book is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Book with id ${id} not found`,
      };
    }

    const [result] = await connection.query<ResultSetHeader>(
      'DELETE FROM books WHERE id = ?',
      [id]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to delete book',
      };
    }

    // ! : return the deleted book
    return {
      status: 200,
      message: 'Book deleted successfully!',
    };
  }
}
