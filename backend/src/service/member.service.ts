import { Member, MemberQueryResult } from '../models/member.model';

import bcrypt, { compare, hash } from 'bcrypt';

import getConnection from '../database';
import { ResultSetHeader } from 'mysql2';
import { createToken } from '../utils/token';

export async function registerMember(bodyRequest: Member) {
  const connection = await getConnection();

  if (connection) {
    const [rowsEmail] = await connection.query<MemberQueryResult[]>(
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

    const [rowsPhone] = await connection.query<MemberQueryResult[]>(
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
    const [result] = await connection.query<ResultSetHeader>(
      'INSERT INTO members (name, email, password, member_type, parent_number, phone, address, major, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
  }
}

export async function loginMember(bodyReqeust: Member) {
  const connection = await getConnection();

  if (connection) {
    const [rowsEmail] = await connection.query<MemberQueryResult[]>(
      'SELECT * FROM members WHERE email = ?',
      [bodyReqeust.email]
    );

    // ? : check if member with email exists
    if (rowsEmail.length === 0) {
      return {
        status: 404,
        message: `Email ${bodyReqeust.email} not found!`,
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
        message: 'Incorrect password',
      };
    }

    // ! : create a token
    const token = createToken({
      id: member.id,
      name: member.name,
      email: member.email,
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
  }
}

export async function getMembers() {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<MemberQueryResult[]>(
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
      message: 'Members found',
      payload: rows,
    };
  }
}

export async function getMemberById(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<MemberQueryResult[]>(
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
      message: 'Member found',
      payload: rows[0],
    };
  }
}

export async function updateMember(id: number, bodyRequest: Member) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<MemberQueryResult[]>(
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
    const [result] = await connection.query<ResultSetHeader>(
      'UPDATE members SET name = ?, email = ?, member_type = ?, parent_number = ?, phone = ?, address = ?, major = ?, department = ? WHERE id = ?',
      [
        bodyRequest.name,
        bodyRequest.email,
        bodyRequest.member_type,
        bodyRequest.parent_number,
        bodyRequest.phone,
        bodyRequest.address,
        bodyRequest.major,
        bodyRequest.department,
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
  }
}

export async function deleteMember(id: number) {
  const connection = await getConnection();

  if (connection) {
    const [rows] = await connection.query<MemberQueryResult[]>(
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
    const [result] = await connection.query<ResultSetHeader>(
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
      message: 'Member deleted successfully',
    };
  }
}
