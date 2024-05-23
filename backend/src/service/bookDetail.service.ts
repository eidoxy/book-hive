import {
  BookDetail,
  BookDetailQueryResult,
} from '../models/bookDetail.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getBookDetails() {
  const connection = await getConnection();

  try {
    if (connection) {
      const [rows] = await connection.query<BookDetailQueryResult[]>(
        `
          SELECT 
          bd.id,
          b.id AS book_id,
          b.title, 
          b.cover, 
          b.description, 
          c.name AS category, 
          s.name AS shelf, 
          b.total_page, 
          a.name AS author, 
          p.name AS publisher, 
          bd.published_date, 
          bd.isbn, 
          bd.created_at, 
          bd.updated_at 
          FROM books_detail bd
          JOIN books b ON bd.books_id = b.id
          JOIN categories c ON b.categories_id = c.id
          JOIN shelves s ON b.shelves_id = s.id
          JOIN authors a ON bd.authors_id = a.id
          JOIN publishers p ON bd.publishers_id = p.id
        `
      );

      if (rows.length === 0) {
        return {
          status: 404,
          message: 'No book details found',
        };
      }

      return {
        status: 200,
        message: 'Book details fetched successfully!',
        payload: rows,
      };
    }
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await connection?.end();
  }
}

export async function getBookDetailById(id: number) {
  const connection = await getConnection();

  try {
    if (connection) {
      const [rows] = await connection.query<BookDetailQueryResult[]>(
        `
          SELECT 
          bd.id,
          b.id AS book_id,
          b.title, 
          b.cover, 
          b.description, 
          c.name AS category, 
          s.name AS shelf, 
          b.total_page, 
          a.name AS author, 
          p.name AS publisher, 
          bd.published_date, 
          bd.isbn, 
          bd.created_at, 
          bd.updated_at 
          FROM books_detail bd
          JOIN books b ON bd.books_id = b.id
          JOIN categories c ON b.categories_id = c.id
          JOIN shelves s ON b.shelves_id = s.id
          JOIN authors a ON bd.authors_id = a.id
          JOIN publishers p ON bd.publishers_id = p.id
          WHERE bd.id = ?
        `,
        [id]
      );

      if (rows.length === 0) {
        return {
          status: 404,
          message: `Book detail with id ${id} not found`,
        };
      }

      return {
        status: 200,
        message: 'Book detail fetched successfully!',
        payload: rows[0],
      };
    }
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await connection?.end();
  }
}

export async function createBookDetail(bodyRequest: BookDetail) {
  const connection = await getConnection();

  try {
    if (connection) {
      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO books_detail 
        (books_id, authors_id, publishers_id, published_date, isbn, stocks_id) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          bodyRequest.books_id,
          bodyRequest.authors_id,
          bodyRequest.publishers_id,
          bodyRequest.published_date,
          bodyRequest.isbn,
          bodyRequest.stocks_id,
        ]
      );

      // ? : check if the result is empty
      if (result.affectedRows === 0) {
        return {
          status: 500,
          message: 'Failed to create book detail',
        };
      }

      // ! : return the created book detail
      return {
        status: 201,
        message: 'Book detail created successfully!',
        payload: {
          ...bodyRequest,
        },
      };
    } else {
      return {
        status: 500,
        message: 'Database connection failed',
      };
    }
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await connection?.end();
  }
}

export async function updateBookDetail(
  id: number,
  bodyRequest: BookDetail
) {
  const connection = await getConnection();

  try {
    if (connection) {
      const [rows] = await connection.query<BookDetailQueryResult[]>(
        `SELECT * FROM books_detail WHERE id = ?`,
        [id]
      );

      // ? : check if the book detail is found
      if (rows.length === 0) {
        return {
          status: 404,
          message: `Book detail with id ${id} not found`,
        };
      }

      const [result] = await connection.query<ResultSetHeader>(
        `UPDATE books_detail 
        SET books_id = ?, authors_id = ?, publishers_id = ?, published_date = ?, isbn = ?, stocks_id = ?
        WHERE id = ?`,
        [
          bodyRequest.books_id,
          bodyRequest.authors_id,
          bodyRequest.publishers_id,
          bodyRequest.published_date,
          bodyRequest.isbn,
          bodyRequest.stocks_id,
          id,
        ]
      );

      // ? : check if the result is empty
      if (result.affectedRows === 0) {
        return {
          status: 500,
          message: 'Failed to update book detail',
        };
      }

      // ! : return the updated book detail
      return {
        status: 200,
        message: 'Book detail updated successfully!',
        payload: {
          ...bodyRequest,
        },
      };
    } else {
      return {
        status: 500,
        message: 'Database connection failed',
      };
    }
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await connection?.end();
  }
}

export async function deleteBookDetail(id: number) {
  const connection = await getConnection();

  try {
    if (connection) {
      const [rows] = await connection.query<BookDetailQueryResult[]>(
        `SELECT * FROM books_detail WHERE id = ?`,
        [id]
      );

      // ? : check if the book detail is found
      if (rows.length === 0) {
        return {
          status: 404,
          message: `Book detail with id ${id} not found`,
        };
      }

      const [result] = await connection.query<ResultSetHeader>(
        `DELETE FROM books_detail WHERE id = ?`,
        [id]
      );

      // ? : check if the result is empty
      if (result.affectedRows === 0) {
        return {
          status: 500,
          message: 'Failed to delete book detail',
        };
      }

      // ! : return the deleted book detail
      return {
        status: 200,
        message: 'Book detail deleted successfully!',
      };
    } else {
      return {
        status: 500,
        message: 'Database connection failed',
      };
    }
  } catch (error) {
    console.error('Database query error:', error);
    return {
      status: 500,
      message: 'Internal server error',
    };
  } finally {
    await connection?.end();
  }
}
