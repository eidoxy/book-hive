import {
  Publisher,
  PublisherQueryResult,
} from './../models/publisher.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getPublishers() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PublisherQueryResult[]>(
      'SELECT * FROM publishers'
    );

    // ? : check if there are no publishers
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'No publishers found',
      };
    }

    // ! : return the fetched publisher
    return {
      status: 200,
      message: 'Publisher fetched successfully!',
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

export async function getPublisherById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PublisherQueryResult[]>(
      'SELECT * FROM publishers WHERE id = ?',
      [id]
    );

    // ? : check if the publisher is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Publisher with id ${id} not found`,
      };
    }

    // ! : return the fetched publisher
    return {
      status: 200,
      message: 'Publisher fetched successfully!',
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

export async function createPublisher(bodyRequest: Publisher) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO publishers (
          name
        )
        VALUES (?)
      `,
      bodyRequest.name
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create publisher',
      };
    }

    // ! : return the created publisher
    return {
      status: 201,
      message: 'Publisher created successfully!',
      payload: {
        id: bodyRequest.id,
        name: bodyRequest.name,
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

export async function updatePublisher(
  id: number,
  bodyRequest: Publisher
) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PublisherQueryResult[]>(
      'SELECT * FROM publishers WHERE id = ?',
      [id]
    );

    // ? : check if there is no publisher with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Publisher with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE publishers SET
        name = ?
        WHERE id = ?
      `,
      [bodyRequest.name, id]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to update publisher',
      };
    }

    // ! : return the updated publisher
    return {
      status: 200,
      message: 'Publisher updated successfully!',
      payload: {
        id,
        name: bodyRequest.name,
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

export async function deletePublisher(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<PublisherQueryResult[]>(
      'SELECT * FROM publishers WHERE id = ?',
      [id]
    );

    // ? : check if there is no publisher with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Publisher with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM publishers WHERE id = ?',
      [id]
    );

    // ! : return the deleted publisher
    return {
      status: 200,
      message: `Publisher with id ${id} deleted successfully!`,
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
