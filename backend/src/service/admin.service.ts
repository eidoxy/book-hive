import { Admin, AdminQueryResult } from '../models/admin.model';

import bcrypt, { compare, hash } from 'bcrypt';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';
import { createToken } from '../utils/token';

export async function loginAdmin(bodyRequest: Admin) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE email = ?',
      [bodyRequest.email]
    );

    // ? : check if the email is incorrect
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Incorrect email!',
      };
    }

    // ? : check if the password is correct
    const admin = rows[0];
    const isPassowrdValid = await compare(
      bodyRequest.password,
      admin.password
    );

    // ? : check if the password is incorrect
    if (!isPassowrdValid) {
      return {
        status: 401,
        message: 'Incorrect password!',
      };
    }

    // ! : create a token
    const token = createToken({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: 'admin',
    });

    // ! : return the token
    return {
      status: 200,
      message: 'Login successful',
      payload: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        token: token,
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

export async function getAdmins() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admins'
    );

    // ? : check if the admins are found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Admins not found',
      };
    }

    // ! : return the fetched admins
    return {
      status: 200,
      message: 'Admins fetched successfully!',
      payload: rows.map((admin) => ({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
      })),
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

export async function getAdminById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE id = ?',
      [id]
    );

    // ? : check if the admin is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin with id ${id} not found`,
      };
    }

    // ! : return the fetched admin
    return {
      status: 200,
      message: 'Admin fetched successfully!',
      payload: {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email,
        phone: rows[0].phone,
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

export async function createAdmin(bodyRequest: Admin) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rowsEmail] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE email = ?',
      [bodyRequest.email]
    );

    // ? check if the email already exists
    if (rowsEmail.length > 0) {
      return {
        status: 409,
        message: `Admin with email ${bodyRequest.email} already exists`,
      };
    }

    const [rowsPhone] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE phone = ?',
      [bodyRequest.phone]
    );

    // ? check if the phone number already exists
    if (rowsPhone.length > 0) {
      return {
        status: 409,
        message: `Admin with phone number ${bodyRequest.phone} already exists`,
      };
    }

    // ! : hash the password
    const hashedPassword = await bcrypt.hash(bodyRequest.password, 10);
    bodyRequest.password = hashedPassword;

    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO admins (name, email, password, phone)
        VALUES (?, ?, ?, ?)
      `,
      [
        bodyRequest.name,
        bodyRequest.email,
        bodyRequest.password,
        bodyRequest.phone,
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to create admin',
      };
    }

    // ! : create a token
    const token = createToken({
      id: bodyRequest.id,
      name: bodyRequest.name,
      email: bodyRequest.email,
    });

    // ! : return the admin
    return {
      status: 201,
      message: 'Admin created successfully!',
      payload: {
        id: bodyRequest.id,
        name: bodyRequest.name,
        email: bodyRequest.email,
        phone: bodyRequest.phone,
        token,
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

export async function updateAdmin(id: number, bodyRequest: Admin) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE id = ?',
      [id]
    );

    // ? : check if there is no admin with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin with id ${id} not found`,
      };
    }

    // ! : hash the password
    const hashedPassword = await bcrypt.hash(bodyRequest.password, 10);
    bodyRequest.password = hashedPassword;

    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE admins SET
        name = ?,
        email = ?,
        password = ?,
        phone = 
        WHERE id = ?
      `,
      [
        bodyRequest.name,
        bodyRequest.email,
        bodyRequest.password,
        bodyRequest.phone,
        id,
      ]
    );

    // ! : return the updated admin
    return {
      status: 200,
      message: 'Admin updated successfully!',
      payload: {
        id: id,
        name: bodyRequest.name,
        email: bodyRequest.email,
        phone: bodyRequest.phone,
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

export async function deleteAdmin(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE id = ?',
      [id]
    );

    // ? : check if there is no admin with the id
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin with id ${id} not found`,
      };
    }

    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM admins WHERE id = ?',
      [id]
    );

    // ! : return the deleted admin
    return {
      status: 200,
      message: `Admin with id ${id} deleted successfully!`,
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
