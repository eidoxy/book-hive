import { Admin, AdminQueryResult } from '../models/admin.model';

import bcrypt, { compare, hash } from 'bcrypt';

import getConnection from '../database';
import { createToken } from '../utils/token';

export async function createAdmin(bodyRequest: Admin) {
  const connection = await getConnection();

  if (connection) {
    // ? check if the email already exists
    const [rowsEmail] = await connection.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE email = ?',
      [bodyRequest.email]
    );
    if (rowsEmail.length > 0) {
      return {
        status: 409,
        message: `Admin with email ${bodyRequest.email} already exists`,
      };
    }

    // ? check if the phone number already exists
    const [rowsPhone] = await connection.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE phone = ?',
      [bodyRequest.phone]
    );
    if (rowsPhone.length > 0) {
      return {
        status: 409,
        message: `Admin with phone number ${bodyRequest.phone} already exists`,
      };
    }

    // ! : hash the password
    const hashedPassword = await bcrypt.hash(
      bodyRequest.password,
      10
    );
    bodyRequest.password = hashedPassword;

    const [rows] = await connection.query<AdminQueryResult[]>(
      'INSERT INTO admins (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [
        bodyRequest.name,
        bodyRequest.email,
        bodyRequest.password,
        bodyRequest.phone,
      ]
    );

    // ? : check if the admin is created
    if (rows.length === 0) {
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
      message: 'Admin created',
      payload: {
        id: bodyRequest.id,
        name: bodyRequest.name,
        email: bodyRequest.email,
        password: bodyRequest.password,
        phone: bodyRequest.phone,
        token,
      },
    };
  }
}

export async function loginAdmin(bodyRequest: Admin) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<AdminQueryResult[]>(
      'SELECT * FROM admin WHERE email = ?',
      [bodyRequest.email]
    );

    // ? : check if the admin is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin ${bodyRequest.email}  not found`,
      };
    }

    // ? : check if the password is correct
    const admin = rows[0];
    const isPassowrdValid = await compare(
      bodyRequest.password,
      admin.password
    );

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
    });

    // ! : return the token
    return {
      status: 200,
      message: 'Login successful',
      payload: {
        token: token,
      },
    };
  }
}

export async function getAllAdmins() {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<AdminQueryResult[]>(
      'SELECT * FROM admins'
    );

    // ? : check if the admins are found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Admins not found',
      };
    }

    // ! : return the admins
    return {
      status: 200,
      message: 'Admins found',
      data: rows,
    };
  }
}

export async function getAdminById(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE id = ?',
      [id]
    );

    // ? : check if the admin is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin ${id} not found`,
      };
    }

    const admin = rows[0];

    // ! : return the admin
    return {
      status: 200,
      message: 'Admin found',
      payload: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  }
}

export async function updateAdmin(id: number, bodyRequest: Admin) {
  const connection = await getConnection();

  if (connection) {
    // ? : check if the admin exists
    const [rows] = await connection.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin ${id} not found`,
      };
    }

    // ! : hash the password
    const hashedPassword = await bcrypt.hash(
      bodyRequest.password,
      10
    );
    bodyRequest.password = hashedPassword;

    const [rowsUpdate] = await connection.query<AdminQueryResult[]>(
      'UPDATE admins SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?',
      [
        bodyRequest.name,
        bodyRequest.email,
        bodyRequest.password,
        bodyRequest.phone,
        id,
      ]
    );

    // ? : check if the admin is updated
    if (rowsUpdate.length === 0) {
      return {
        status: 500,
        message: 'Failed to update admin',
      };
    }

    // ! : return the admin
    return {
      status: 200,
      message: 'Admin updated',
      payload: {
        id: id,
        name: bodyRequest.name,
        email: bodyRequest.email,
        password: bodyRequest.password,
        phone: bodyRequest.phone,
      },
    };
  }
}

export async function deleteAdmin(id: number) {
  const connection = await getConnection();

  if (connection) {
    // ? : check if the admin exists
    const [rows] = await connection.query<AdminQueryResult[]>(
      'SELECT * FROM admins WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return {
        status: 404,
        message: `Admin ${id} not found`,
      };
    }

    const [rowsDelete] = await connection.query<AdminQueryResult[]>(
      'DELETE FROM admins WHERE id = ?',
      [id]
    );

    // ? : check if the admin is deleted
    if (rowsDelete.length === 0) {
      return {
        status: 500,
        message: 'Failed to delete admin',
      };
    }

    // ! : return the admin
    return {
      status: 200,
      message: 'Admin deleted',
      payload: {
        id: id,
      },
    };
  }
}
