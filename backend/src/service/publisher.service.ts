import {
  Publisher,
  PublisherQueryResult,
} from './../models/publisher.model';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';

export async function getPublishers() {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<PublisherQueryResult[]>(
      'SELECT * FROM publishers'
    );

    // ! : return the fetched publisher
    return {
      statusCode: 200,
      message: 'Publisher fetched successfully!',
      payload: rows,
    };
  }
}

export async function getPublisherById(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<PublisherQueryResult[]>(
      'SELECT * FROM publishers WHERE id = ?',
      [id]
    );

    // ? : check if the publisher is found
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: `Publisher with id ${id} not found`,
      };
    }

    // ! : return the fetched category
    return {
      statusCode: 200,
      message: 'Publisher fetched successfully!',
      payload: rows[0],
    };
  }
}

export async function createPublisher(bodyRequest: Publisher) {
  const connection = await getConnection();

  if (connection) {
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO publishers (name) VALUES (?)',
      bodyRequest.name
    );

    // ! : return the created publisher
    return {
      statusCode: 201,
      message: 'Publisher created successfully!',
      payload: {
        id: bodyRequest.id,
        name: bodyRequest.name,
      },
    };
  }
}

export async function updatePublisher(
  id: number,
  bodyRequest: Publisher
) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<PublisherQueryResult[]>(
      'SELECT * FROM publishers WHERE id = ?',
      [id]
    );

    // ? : check if there is no publisher with the id
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: `Publisher with id ${id} not found`,
      };
    }

    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE publishers SET name = ? WHERE id = ?',
      [bodyRequest.name, id]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        statusCode: 500,
        message: 'Failed to update publisher',
      };
    }

    // ! : return the updated publisher
    return {
      statusCode: 200,
      message: 'Publisher updated successfully!',
      payload: {
        id,
        name: bodyRequest.name,
      },
    };
  }
}

export async function deletePublisher(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<PublisherQueryResult[]>(
      'SELECT * FROM publishers WHERE id = ?',
      [id]
    );

    // ? : check if there is no publisher with the id
    if (rows.length === 0) {
      return {
        statusCode: 404,
        message: `Publisher with id ${id} not found`,
      };
    }

    const [result] = await connection.query<ResultSetHeader>(
      'DELETE FROM publishers WHERE id = ?',
      [id]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        statusCode: 500,
        message: 'Failed to delete publisher',
      };
    }

    // ! : return the deleted publisher
    return {
      statusCode: 200,
      message: `Publisher with id ${id} deleted successfully!`,
    };
  }
}
