import {
  Borrowing,
  BorrowingQueryResult,
} from '../models/borrowing.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getBorrowings() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BorrowingQueryResult[]>(
      `
        SELECT 
        br.id,
        m.name AS member,
        b.title AS book,
        a.name AS admin,
        br.borrow_date,
        br.return_date,
        br.status
        FROM borrowings br
        JOIN members m ON br.members_id = m.id
        JOIN books_detail bd ON br.books_detail_id = bd.id
        JOIN books b ON bd.books_id = b.id
        JOIN admins a ON br.admins_id = a.id
        ORDER BY br.id
      `
    );

    // ? : check if there are no borrowings
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No borrowings found',
      };
    }

    // ! : return the fetched borrowings
    return {
      status: 200,
      message: 'Borrowings fetched successfully!',
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

export async function getBorrowingById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BorrowingQueryResult[]>(
      `
        SELECT 
        br.id,
        m.name AS member,
        b.title AS book,
        a.name AS admin,
        br.borrow_date,
        br.return_date,
        br.status
        FROM borrowings br
        JOIN members m ON br.members_id = m.id
        JOIN books_detail bd ON br.books_detail_id = bd.id
        JOIN books b ON bd.books_id = b.id
        JOIN admins a ON br.admins_id = a.id
        WHERE br.id = ?
      `,
      [id]
    );

    // ? : check if there are no borrowings
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No borrowings found',
      };
    }

    // ! : return the fetched borrowings
    return {
      status: 200,
      message: 'Borrowings fetched successfully!',
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

export async function getBorrowingsLate() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BorrowingQueryResult[]>(
      `
        SELECT 
        br.id,
        m.name AS member,
        b.title AS book,
        a.name AS admin,
        br.borrow_date,
        br.return_date,
        br.status
        FROM borrowings br
        JOIN members m ON br.members_id = m.id
        JOIN books_detail bd ON br.books_detail_id = bd.id
        JOIN books b ON bd.books_id = b.id
        JOIN admins a ON br.admins_id = a.id
        WHERE br.status = 'late'
        ORDER BY br.id
      `
    );

    // ? : check if there are no late borrowings
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No late borrowings found',
      };
    }

    // ! : return the fetched borrowings
    return {
      status: 200,
      message: 'Borrowings fetched successfully!',
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

export async function createBorrowing(borrowing: Borrowing) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO borrowings (
          members_id,
          books_detail_id,
          admins_id,
          borrow_date,
          return_date,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        borrowing.members_id,
        borrowing.books_detail_id,
        borrowing.admins_id,
        borrowing.borrow_date,
        borrowing.return_date,
        borrowing.status,
      ]
    );

    // ! : return the created borrowing
    return {
      status: 201,
      message: 'Borrowing created successfully!',
      payload: {
        ...borrowing,
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

export async function updateBorrowing(
  id: number,
  borrowing: Borrowing
) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE borrowings SET
        members_id = ?,
        books_detail_id = ?,
        admins_id = ?,
        borrow_date = ?,
        return_date = ?,
        status = ?
        WHERE id = ?
      `,
      [
        borrowing.members_id,
        borrowing.books_detail_id,
        borrowing.admins_id,
        borrowing.borrow_date,
        borrowing.return_date,
        borrowing.status,
        id,
      ]
    );

    // ? : check if the borrowing is not found
    if (result.affectedRows === 0) {
      return {
        status: 404,
        message: 'Borrowing not found',
      };
    }

    // ! : return the updated borrowing
    return {
      status: 200,
      message: 'Borrowing updated successfully!',
      payload: {
        ...borrowing,
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

export async function deleteBorrowing(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<BorrowingQueryResult[]>(
      `SELECT * FROM borrowings WHERE id = ?`,
      [id]
    );

    // ? : check if the borrowing is not found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Borrowing not found',
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      `DELETE FROM borrowings WHERE id = ?`,
      [id]
    );

    // ! : return the deleted borrowing
    return {
      status: 200,
      message: 'Borrowing deleted successfully!',
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
