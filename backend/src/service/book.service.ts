import { ResultSetHeader } from 'mysql2';
import path from 'path';
import fs from 'fs';

import { Book, BookQueryResult } from '../models/book.model';
import getConnection from '../database';

export async function getBooks() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BookQueryResult[]>(
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

export async function getBookById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BookQueryResult[]>(
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

export async function getBookList() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BookQueryResult[]>(
      `
        SELECT
        b.id,
        b.title,
        b.cover,
        a.name AS author,
        st.quantity AS stock,
        sh.name AS shelf
      FROM
        books b
        JOIN books_detail bd ON b.id = bd.books_id
        JOIN authors a ON bd.authors_id = a.id
        JOIN stocks st ON b.id = st.books_id
        JOIN shelves sh ON b.shelves_id = sh.id
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

export async function getBookRecomendation() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BookQueryResult[]>(`
      SELECT 
        b.title,
        b.cover,
        a.name AS author,
        st.quantity AS stock,
        s.name AS shelf
      FROM 
        books b
      JOIN 
        books_detail bd ON b.id = bd.books_id
      JOIN 
        authors a ON bd.authors_id = a.id
      JOIN 
        stocks st ON b.id = st.books_id
      JOIN 
        shelves s ON b.shelves_id = s.id
      ORDER BY 
        st.quantity DESC;
    `);

    // ? : check if the book is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No books found',
      };
    }

    // ! : return the fetched book
    return {
      status: 200,
      message: 'Books fetched successfully',
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

export async function getBookPopular() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BookQueryResult[]>(`
      SELECT 
        b.title,
        b.cover,
        a.name AS author,
        COUNT(brw.id) AS borrow_count,
        s.name AS shelf
      FROM 
        books b
      JOIN 
        books_detail bd ON b.id = bd.books_id
      JOIN 
        authors a ON bd.authors_id = a.id
      JOIN 
        shelves s ON b.shelves_id = s.id
      LEFT JOIN 
        borrowings brw ON bd.id = brw.books_detail_id
      GROUP BY 
        b.id, a.id, s.id
      ORDER BY 
        borrow_count DESC
      LIMIT 10;
    `);

    // ? : check if the book is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No books found',
      };
    }

    // ! : return the fetched book
    return {
      status: 200,
      message: 'Books fetched successfully',
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

export async function getBookByCategory(categoryId: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    console.log('Category ID:', categoryId);
    console.log('Type:', typeof categoryId);

    const [result] = await db.query<BookQueryResult[]>(
      `
        SELECT
        b.id,
        b.title,
        b.cover,
        a.name AS author,
        st.quantity AS stock,
        sh.name AS shelf
      FROM
        books b
        JOIN books_detail bd ON b.id = bd.books_id
        JOIN authors a ON bd.authors_id = a.id
        JOIN stocks st ON b.id = st.books_id
        JOIN shelves sh ON b.shelves_id = sh.id
      WHERE
        b.categories_id = ?
      `,
      [categoryId]
    );

    console.log('Result:', result);

    // ? : check if the book is found
    if (result.length === 0) {
      return {
        status: 404,
        message: 'No books found',
      };
    }

    // ! : return the fetched book
    return {
      status: 200,
      message: 'Books from categories fetched successfully',
      payload: result,
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

export async function createBook(
  bodyRequest: Book,
  file: Express.Multer.File
) {
  const db = await getConnection();
  const path = 'images/' + file ? file.filename : null;
  const total_page = bodyRequest.total_page;
  const totalPageInt = parseInt(total_page.toString(), 10);

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO books (
          title,
          cover,
          description,
          categories_id,
          shelves_id,
          total_page
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        bodyRequest.title,
        path,
        bodyRequest.description,
        bodyRequest.categories_id,
        bodyRequest.shelves_id,
        totalPageInt,
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

export async function updateBook(id: number, bodyRequest: Book) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BookQueryResult[]>(
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

    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE books SET 
        title = ?,
        cover = ?,
        description = ?,
        categories_id = ?,
        shelves_id = ?,
        total_page = ?
        WHERE id = ?
      `,
      [
        bodyRequest.title,
        bodyRequest.cover,
        bodyRequest.description,
        bodyRequest.categories_id,
        bodyRequest.shelves_id,
        bodyRequest.total_page,
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

export async function deleteBook(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BookQueryResult[]>(
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

    // ! : Delete the image file associated with the book
    const imagePath = path.join('./public/images/' + rows[0].cover);
    console.log('Image path:', imagePath);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image:', err);
      }
    });

    const [result] = await db.query<ResultSetHeader>(
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
