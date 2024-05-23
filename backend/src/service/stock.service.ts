import { Stock, StockQueryResult } from '../models/stock.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getStocks() {
  const connection = await getConnection();

  try {
    if (connection) {
      const [rows] = await connection.query<StockQueryResult[]>(
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

export async function getStockById(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<StockQueryResult[]>(
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

    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No stock found',
      };
    }

    return {
      status: 200,
      message: 'Stock fetched successfully!',
      payload: rows[0],
    };
  }
}

export async function createStock(stock: Stock) {
  const connection = await getConnection();

  try {
    if (connection) {
      const [result] = await connection.query<ResultSetHeader>(
        `
          INSERT INTO stocks 
          (books_id, quantity) 
          VALUES 
          (?, ?)
        `,
        [stock.books_id, stock.quantity]
      );

      return {
        status: 201,
        message: 'Stock created successfully!',
        payload: {
          ...stock,
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

export async function updateStock(id: number, stock: Stock) {
  const connection = await getConnection();

  try {
    if (connection) {
      const [result] = await connection.query<ResultSetHeader>(
        `
          UPDATE stocks
          SET books_id = ?, quantity = ?
          WHERE id = ?
        `,
        [stock.books_id, stock.quantity, id]
      );

      if (result.affectedRows === 0) {
        return {
          status: 404,
          message: `Stock with id ${id} not found`,
        };
      }

      return {
        status: 200,
        message: 'Stock updated successfully!',
        payload: {
          ...stock,
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

export async function deleteStock(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<StockQueryResult[]>(
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

    if (rows.length === 0) {
      return {
        status: 404,
        message: `Stock with id ${id} not found`,
      };
    }

    const [result] = await connection.query<ResultSetHeader>(
      `
        DELETE FROM stocks
        WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to delete stock',
      };
    }

    return {
      status: 200,
      message: 'Stock deleted successfully!',
    };
  }
}
