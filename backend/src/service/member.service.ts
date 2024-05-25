import { Member, MemberQueryResult } from '../models/member.model';

import bcrypt, { compare, hash } from 'bcrypt';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';
import { createToken } from '../utils/token';

export async function registerMember(bodyRequest: Member) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rowsEmail] = await db.query<MemberQueryResult[]>(
      'SELECT * FROM members WHERE email = ?',
      [bodyRequest.email]
    );

    // ? : check if member with email already exists
    if (rowsEmail.length > 0) {
      return {
        status: 409,
        message: `Email ${bodyRequest.email} already exists!`,
      };
    }

    const [rowsPhone] = await db.query<MemberQueryResult[]>(
      'SELECT * FROM members WHERE phone = ?',
      [bodyRequest.phone]
    );

    // ? : check if member with phone already exists
    if (rowsPhone.length > 0) {
      return {
        status: 409,
        message: `Phone ${bodyRequest.phone} already exists!`,
      };
    }

    // ! : hash the password
    const hashedPassword = await hash(bodyRequest.password, 10);

    // ? : insert the member
    const [result] = await db.query<ResultSetHeader>(
      `
        INSERT INTO members (
          name,
          email,
          password,
          member_type,
          parent_number,
          phone,
          address,
          major,
          department
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        bodyRequest.name,
        bodyRequest.email,
        hashedPassword,
        bodyRequest.member_type,
        bodyRequest.parent_number,
        bodyRequest.phone,
        bodyRequest.address,
        bodyRequest.major,
        bodyRequest.department,
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to register member',
      };
    }

    // ! return the member
    return {
      status: 201,
      message: 'Member registered successfully',
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

export async function loginMember(bodyReqeust: Member) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rowsEmail] = await db.query<MemberQueryResult[]>(
      'SELECT * FROM members WHERE email = ?',
      [bodyReqeust.email]
    );

    // ? : check if member with email exists
    if (rowsEmail.length === 0) {
      return {
        status: 401,
        message: `Email is incorrect!`,
      };
    }

    // ! : compare the password
    const member = rowsEmail[0];
    const isPasswordMatch = await compare(
      bodyReqeust.password,
      rowsEmail[0].password
    );

    // ? : check if the password is incorrect
    if (!isPasswordMatch) {
      return {
        status: 401,
        message: 'Password is incorrect!',
      };
    }

    // ! : create a token
    const token = createToken({
      id: member.id,
      name: member.name,
      email: member.email,
      role: 'user',
    });

    // ! : return the member
    return {
      status: 200,
      message: 'Login successful',
      payload: {
        id: member.id,
        name: member.name,
        email: member.email,
        member_type: member.member_type,
        parent_number: member.parent_number,
        phone: member.phone,
        address: member.address,
        major: member.major,
        department: member.department,
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

export async function getMembers() {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<MemberQueryResult[]>(
      'SELECT * FROM members'
    );

    // ? : check if the members are found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Members not found',
      };
    }

    // ! : return the members
    return {
      status: 200,
      message: 'Members fetched successfully',
      payload: {
        id: rows[0].id,
        name: rows[0].name,
        email: rows[0].email,
        member_type: rows[0].member_type,
        parent_number: rows[0].parent_number,
        phone: rows[0].phone,
        address: rows[0].address,
        major: rows[0].major,
        department: rows[0].department,
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

export async function getMemberById(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<MemberQueryResult[]>(
      'SELECT * FROM members WHERE id = ?',
      [id]
    );

    // ? : check if the member is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Member not found',
      };
    }

    // ! : return the member
    return {
      status: 200,
      message: 'Member fetched successfully',
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

export async function updateMember(id: number, bodyRequest: Member) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<MemberQueryResult[]>(
      'SELECT * FROM members WHERE id = ?',
      [id]
    );

    // ? : check if the member is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Member not found',
      };
    }

    // ! : update the member
    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE members SET
        name = ?,
        email = ?,
        phone = ?,
        address = ?,
        WHERE id = ?
      `,
      [
        bodyRequest.name,
        bodyRequest.email,
        bodyRequest.phone,
        bodyRequest.address,
        id,
      ]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to update member',
      };
    }

    // ! : return the member
    return {
      status: 200,
      message: 'Member updated successfully',
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

export async function deleteMember(id: number) {
  const db = await getConnection();

  // ? : check if the database connection is successful
  if (!db) throw new Error('Cannot connect to database');

  try {
    const [rows] = await db.query<MemberQueryResult[]>(
      'SELECT * FROM members WHERE id = ?',
      [id]
    );

    // ? : check if the member is found
    if (rows.length === 0) {
      return {
        status: 404,
        message: 'Member not found',
      };
    }

    // ! : delete the member
    const [result] = await db.query<ResultSetHeader>(
      'DELETE FROM members WHERE id = ?',
      [id]
    );

    // ? : check if the result is empty
    if (result.affectedRows === 0) {
      return {
        status: 500,
        message: 'Failed to delete member',
      };
    }

    // ! : return the member
    return {
      status: 200,
      message: `Member ${rows} deleted successfully`,
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
