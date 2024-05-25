import { Stock, StockQueryResult } from '../models/stock.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getStocks() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<StockQueryResult[]>(
      `
        SELECT 
        s.id, 
        b.title AS books,
        s.quantity, 
        s.created_at, 
        s.updated_at 
        FROM stocks s
        JOIN books b ON s.books_id = b.id
      `
    );

    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No stocks found',
      };
    }

    return {
      status: 200,
      message: 'Stocks fetched successfully!',
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

export async function getStockById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<StockQueryResult[]>(
      `
        SELECT 
        s.id, 
        b.title AS books,
        s.quantity, 
        s.created_at, 
        s.updated_at 
        FROM stocks s
        JOIN books b ON s.books_id = b.id
        WHERE s.id = ?
      `,
      [id]
    );

    // ? : check if the stock is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No stock found',
      };
    }

    // ? : return the stock
    return {
      status: 200,
      message: 'Stock fetched successfully!',
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

export async function createStock(bodyRequest: Stock) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO stocks (
          books_id,
          quantity
        ) 
        VALUES (?, ?)
      `,
      [bodyRequest.books_id, bodyRequest.quantity]
    );

    return {
      status: 201,
      message: 'Stock created successfully!',
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

export async function updateStock(id: number, bodyRequest: Stock) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE stocks SET
        books_id = ?,
        quantity = ?
        WHERE id = ?
      `,
      [bodyRequest.books_id, bodyRequest.quantity, id]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 404,
        message: `Stock with id ${id} not found`,
      };
    }

    // ? : return the updated stock
    return {
      status: 200,
      message: 'Stock updated successfully!',
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

export async function deleteStock(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<StockQueryResult[]>(
      `
        SELECT 
        s.id, 
        s.books_id, 
        s.quantity, 
        s.created_at, 
        s.updated_at 
        FROM stocks s
        WHERE s.id = ?
      `,
      [id]
    );

    // ? : check if the stock is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Stock with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      `DELETE FROM stocks WHERE id = ?`,
      [id]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to delete stock',
      };
    }

    // ? : return the deleted stock
    return {
      status: 200,
      message: 'Stock deleted successfully!',
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
